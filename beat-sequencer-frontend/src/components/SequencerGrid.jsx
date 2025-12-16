import React from 'react';
import styles from './SequencerGrid.module.css'; // We're using this!
import { playSound } from '../services/audioService'; // Import our playSound function

// 1. Accept 'grid' and 'onCellClick' as props
function SequencerGrid({ grid, onCellClick,instrumentNames }) {

  const handleCellClick = (rowIndex, stepIndex) => {
    // 2. Call the function from our App.jsx parent
    onCellClick(rowIndex, stepIndex);

    // 3. Play a sound immediately on click for feedback
    // We only play it if the cell is being turned ON
    if (!grid[rowIndex][stepIndex]) {
      // Get the instrument name from our grid prop
      const names = instrumentNames || ['kick', 'snare', 'hihat', 'tom'];
      playSound(names[rowIndex]);
    }
  };

  return (
 <div className={styles.gridContainer}>
      {grid.map((row, rowIndex) => (
        
        // CHANGE 2: Add a wrapper div to align Label + Row side-by-side
        <div key={rowIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          
          {/* CHANGE 3: The Instrument Label */}
          <div style={{ 
            width: '60px',        // Fixed width ensures alignment
            textAlign: 'right',   
            marginRight: '10px',  // Space between label and grid
            color: '#ccc',
            fontSize: '0.85rem',
            textTransform: 'capitalize',
            fontWeight: 'bold'
          }}>
             {/* Show name if valid, otherwise fallback */}
            {instrumentNames && instrumentNames[rowIndex] ? instrumentNames[rowIndex] : `Track ${rowIndex + 1}`}
          </div>

          {/* Your existing row of cells */}
          <div className={styles.row}>
            {row.map((isActive, stepIndex) => {
              const cellClass = `${styles.cell} ${isActive ? styles.active : ''}`;

              return (
                <div
                  key={`${rowIndex}-${stepIndex}`}
                  className={cellClass}
                  onClick={() => handleCellClick(rowIndex, stepIndex)}
                  // Optional: Add a subtle visual rhythm guide (every 4th step)
                  style={{ opacity: stepIndex % 4 === 0 ? 1 : 0.8 }} 
                >
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SequencerGrid;