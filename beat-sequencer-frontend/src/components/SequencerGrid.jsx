import React from 'react';
import styles from './SequencerGrid.module.css'; // We're using this!
import { playSound } from '../services/audioService'; // Import our playSound function

// 1. Accept 'grid' and 'onCellClick' as props
function SequencerGrid({ grid, onCellClick }) {

  const handleCellClick = (rowIndex, stepIndex) => {
    // 2. Call the function from our App.jsx parent
    onCellClick(rowIndex, stepIndex);

    // 3. Play a sound immediately on click for feedback
    // We only play it if the cell is being turned ON
    if (!grid[rowIndex][stepIndex]) {
      // Get the instrument name from our grid prop
      const instrumentName = ['kick', 'snare', 'hihat', 'tom'][rowIndex];
      playSound(instrumentName);
    }
  };

  return (
    <div className={styles.gridContainer}>
      {/* 4. We now use the 'grid' prop to build the rows */}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {/* 5. We map over the steps in each row */}
          {row.map((isActive, stepIndex) => {
            // 6. Dynamically set the cell's class
            const cellClass = `${styles.cell} ${isActive ? styles.active : ''}`;

            return (
              <div
                key={`${rowIndex}-${stepIndex}`}
                className={cellClass} // 7. Use the dynamic class
                // 8. Add the onClick handler
                onClick={() => handleCellClick(rowIndex, stepIndex)}
              >
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SequencerGrid;