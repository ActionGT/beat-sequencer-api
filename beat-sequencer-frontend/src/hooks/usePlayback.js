import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { players, startAudio } from '../services/audioService';

const instrumentNames = ['kick', 'snare', 'hihat', 'tom'];

export function usePlayback(grid) {

    // A state to track if we are playing or not
    const [isPlaying, setIsPlaying] = useState(false);

    // A "Ref" to hold our grid. This is crucial.// It allows the Tone.js loop to see the *current* grid state// without us having to restart the loop every time the grid changes.
    const gridRef = useRef(grid);

    // A Ref to hold the Tone.js Sequence object
    const sequenceRef = useRef(null);

    // Keep our gridRef in sync with the latest grid state
    useEffect(() => {
        gridRef.current = grid;
    }, [grid]); // This effect re-runs every time the 'grid' prop changes// This effect runs only once to set up the sequence
    useEffect(() => {
        // Create the sequence
        sequenceRef.current = new Tone.Sequence(
            (time, stepIndex) => {
                // This callback runs for every step in the sequence// Get the current grid from our ref
                const currentGrid = gridRef.current;

                // Loop over the instruments
                instrumentNames.forEach((instrument, rowIndex) => {
                    // Check if the cell for this instrument and step is active
                    if (currentGrid[rowIndex][stepIndex]) {
                        // If yes, trigger the sound at the precise 'time'
                        players.player(instrument).start(time);
                    }
                });
            },
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // An array of step indices'16n' // The timing of each step (a 16th note)
        );

        // Make the sequence loop forever
        sequenceRef.current.loop = true;

        // Start the sequence
        sequenceRef.current.start(0);

        // Clean up when the component unmounts
        return () => {
            sequenceRef.current?.dispose();
        };
    }, []); // The empty array [] means this runs only ONCE 

    // Function to toggle play/pause
    const togglePlay = async () => {
        // Make sure audio is started
        await startAudio();

        if (isPlaying) {
            Tone.Transport.stop();
            setIsPlaying(false);
        } else {
            Tone.Transport.start();
            setIsPlaying(true);
        }
    };

    // Return the values our components will need
    return { isPlaying, togglePlay };
}
