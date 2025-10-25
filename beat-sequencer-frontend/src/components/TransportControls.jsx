import React from 'react';
import styles from './TransportControls.module.css'; // Import the styles

function TransportControls() {
  return (
    <div className={styles.controlsContainer}>
      {/* Play/Pause Button */}
      <button className={styles.playButton}>
        Play
      </button> {/* <-- This is the corrected line */}

      {/* Tempo Slider */}
      <div className={styles.tempoSliderContainer}>
        <label htmlFor="tempo">Tempo: 120 BPM</label>
        <input
          type="range"
          id="tempo"
          min="60"
          max="180"
          defaultValue="120"
        />
      </div>
    </div>
  );
}

export default TransportControls;