import React from 'react';
import styles from './TransportControls.module.css'; // Import the styles

function TransportControls({ isPlaying, onPlayPause, tempo, onTempoChange,onSave}) {
  return (
    <div className={styles.controlsContainer}>
       {/* 2. Call onPlayPause when clicked */}
      <button className={styles.playButton}
          onClick={onPlayPause}  
      >
      {isPlaying ? 'Pause' : 'Play'}
      </button> {/* <-- This is the corrected line */}

      <button
      className={styles.playButton}
      onClick={onSave}
      style={{ backgroundColor: '#28a745', marginLeft: '1rem' }}
      >Save Beat</button>

      {/* Tempo Slider */}
      <div className={styles.tempoSliderContainer}>
        <label htmlFor="tempo">Tempo: 120 BPM</label>
        <input
          type="range"
          id="tempo"
          min="60"
          max="180"
          value={tempo}
          onChange={(e) => onTempoChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TransportControls;