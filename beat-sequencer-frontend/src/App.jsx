import { useState, useEffect, use} from 'react'; // 1. Import useState
import * as Tone from 'tone';
import './App.css'
import SequencerGrid from './components/SequencerGrid';
import TransportControls from './components/TransportControls';
// import { startAudio } from './services/audioService'; // Keep this import
import { usePlayback } from './hooks/usePlayback';



// 2. Define our grid dimensions and instrument names
const instrumentNames = ['kick', 'snare', 'hihat', 'tom'];
const numSteps = 16;

// 3. Helper function to create the initial empty grid
const createInitialGrid = () => {
  return instrumentNames.map(() => new Array(numSteps).fill(false));
};


function App() {
  

  // 4. Create the grid state
  const [grid, setGrid] = useState(createInitialGrid()); 
  const [tempo, setTempo] = useState(120);
  // 2. Use the hook. It manages all playback logic.
const { isPlaying, togglePlay } = usePlayback(grid);

useEffect(() => {
  Tone.Transport.bpm.value = tempo;
  Tone.Transport.bpm.rampTo(tempo, 0.1); // Smooth transition to new tempo
}, [tempo]);

  const handleCellClick = (rowIndex, stepIndex) => {
    const newGrid = grid.map(row => [...row]);
    newGrid[rowIndex][stepIndex] = !newGrid[rowIndex][stepIndex];
    setGrid(newGrid);
  };


const handleTempoChange = (newTempo) => {
  setTempo(newTempo);
};


  return (
    <div>
      <h1>Beat Sequencer</h1>
      
         {/* 3. Pass the values from the hook to the controls */}
      <TransportControls
        isPlaying={isPlaying}
        onPlayPause={togglePlay} 
        tempo={tempo}
        onTempoChange={handleTempoChange}
      />
      <SequencerGrid
        grid={grid}
        onCellClick={handleCellClick} 
      />
    </div>
  )
}

export default App

