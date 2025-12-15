import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../services/api';
import TransportControls from '../components/TransportControls';
import SequencerGrid from '../components/SequencerGrid';
import { usePlayback } from '../hooks/usePlayback';
import * as Tone from 'tone';

const instrumentNames = ['kick', 'snare', 'hihat', 'tom'];
const numSteps = 16;
const createEmptyGrid = () => instrumentNames.map(() => new Array(numSteps).fill(false));

function PublicBeatPage() {
  const { shareId } = useParams(); // 1. We get the 'shareId' (UUID) from the URL
  const [grid, setGrid] = useState(createEmptyGrid());
  const [beatName, setBeatName] = useState('Loading...');
  const [authorName, setAuthorName] = useState('Unknown');
  const [error, setError] = useState('');
  
  const [tempo, setTempo] = useState(120);
  const { isPlaying, togglePlay } = usePlayback(grid);

  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
  }, [tempo]);

  useEffect(() => {
    const fetchBeat = async () => {
      try {
        // 2. Fetch using your specific public endpoint
        const response = await apiClient.get(`/api/beats/public/${shareId}`);
        
        const beatData = response.data;
        setBeatName(beatData.name);
        // Depending on your DTO, check where the username is stored (e.g., beatData.username or beatData.user.username)
        setAuthorName(beatData.username || (beatData.user && beatData.user.username) || 'Unknown');
        
        if (beatData.pattern) {
            setGrid(JSON.parse(beatData.pattern));
        }
      } catch (err) {
        console.error("Error loading beat:", err);
        setError("Beat not found or private.");
        setBeatName("Error");
      }
    };

    fetchBeat();
  }, [shareId]); // Depend on shareId

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Link to="/" style={{ color: '#ccc', textDecoration: 'none' }}>&larr; Back to Home</Link>
      
      <h1>{beatName}</h1>
      <p style={{ color: '#888' }}>Created by: {authorName}</p>

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <TransportControls 
            isPlaying={isPlaying}
            onPlayPause={togglePlay}
            tempo={tempo}
            onTempoChange={setTempo}
            onSave={null} 
          />
          <div style={{ pointerEvents: 'none', opacity: 0.8 }}>
            <SequencerGrid grid={grid} onCellClick={() => {}} />
          </div>
        </>
      )}
    </div>
  );
}

export default PublicBeatPage;