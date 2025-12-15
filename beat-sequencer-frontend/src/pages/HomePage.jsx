import React from 'react';
// 1. Import the components
import TransportControls from '../components/TransportControls';
import SequencerGrid from '../components/SequencerGrid';
import MyBeats from '../components/MyBeats';
import { useAuth } from '../context/AuthContext';

// 2. Accept all the props from App.jsx
function HomePage({ 
  tempo, 
  onTempoChange, 
  isPlaying, 
  onPlayPause, 
  grid, 
  onCellClick,
  onSave,
  setGrid 
}) {
  const { currentUser } = useAuth();
  // 4. Function to handle loading
  const handleLoadBeat = (patternString) => {
    try {
      // The backend sends the pattern as a string, so we turn it back into an array
      const newGrid = JSON.parse(patternString);
      setGrid(newGrid); 
      console.log("Beat loaded!");
    } catch (e) {
      console.error("Failed to parse beat pattern:", e);
    }
  };
  return (
    <div>
      {/* 3. Render the components and pass the props down */}
      <TransportControls 
        isPlaying={isPlaying} 
        onPlayPause={onPlayPause}
        tempo={tempo}
        onTempoChange={onTempoChange}
        onSave={onSave}
      /> 
      <SequencerGrid 
        grid={grid} 
        onCellClick={onCellClick} 
      />
      {/* 5. Show MyBeats only if logged in */}
      {currentUser && (
        <MyBeats 
          currentUser={currentUser} 
          onLoadBeat={handleLoadBeat} 
        />
      )}
    </div>
  );
}

export default HomePage;