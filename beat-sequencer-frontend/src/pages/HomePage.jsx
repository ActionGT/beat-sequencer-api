import React from 'react';
// 1. Import the components
import TransportControls from '../components/TransportControls';
import SequencerGrid from '../components/SequencerGrid';

// 2. Accept all the props from App.jsx
function HomePage({ 
  tempo, 
  onTempoChange, 
  isPlaying, 
  onPlayPause, 
  grid, 
  onCellClick 
}) {
  
  return (
    <div>
      {/* 3. Render the components and pass the props down */}
      <TransportControls 
        isPlaying={isPlaying} 
        onPlayPause={onPlayPause}
        tempo={tempo}
        onTempoChange={onTempoChange}
      /> 
      <SequencerGrid 
        grid={grid} 
        onCellClick={onCellClick} 
      />
    </div>
  );
}

export default HomePage;