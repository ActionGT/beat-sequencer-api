import { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SequencerGrid from './components/SequencerGrid';
import TransportControls from './components/TransportControls';
import { usePlayback } from './hooks/usePlayback';
import { useAuth } from './context/AuthContext'; // 1. Import useAuth

// --- (Keep constants and helper functions) ---
const instrumentNames = ['kick', 'snare', 'hihat', 'tom'];
const numSteps = 16;
const createInitialGrid = () => {
    return instrumentNames.map(() => new Array(numSteps).fill(false));
};

function App() {
  // --- (Keep sequencer state and handlers) ---
  const [grid, setGrid] = useState(createInitialGrid());
  const [tempo, setTempo] = useState(120);
  const { isPlaying, togglePlay } = usePlayback(grid);
  const { currentUser, logout } = useAuth(); // 2. Get user and logout from context

  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
    Tone.Transport.bpm.rampTo(tempo, 0.1);
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
      {/* 3. Update Navigation */}
      <nav style={{ padding: '1rem', background: '#242424', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ color: 'white', margin: '0 1rem' }}>Home</Link>
        </div>
        <div>
          {currentUser ? (
            <>
              <span style={{ color: 'white', marginRight: '1rem' }}>Welcome, {currentUser.username}!</span>
              <button onClick={logout} style={{ padding: '0.3rem 0.6rem' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', margin: '0 1rem' }}>Login</Link>
              <Link to="/register" style={{ color: 'white', margin: '0 1rem' }}>Register</Link>
            </>
          )}
        </div>
      </nav>

      <h1 style={{ marginTop: '1rem' }}>Beat Sequencer</h1>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              grid={grid}
              onCellClick={handleCellClick}
              tempo={tempo}
              onTempoChange={handleTempoChange}
              isPlaying={isPlaying}
              onPlayPause={togglePlay}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App