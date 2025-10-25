import React from 'react';
import styles from './SequencerGrid.module.css'; // Import our new CSS module

// Let's define our instruments
const instrumentRows = ['Kick', 'Snare', 'HiHat', 'Tom'];
const steps = Array(16).fill(0); // An array to map 16 steps

function SequencerGrid() {
  return (
    <div className={styles.gridContainer}>
      {instrumentRows.map((instrument, rowIndex) => (
        // This 'key' is crucial for React to track each row
        <div key={rowIndex} className={styles.row}>
          {steps.map((_, stepIndex) => (
            // The key for each cell is also crucial
            <div
              key={`${rowIndex}-${stepIndex}`}
              className={styles.cell}
            >
              {/* We'll add click handlers and active state later */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SequencerGrid;