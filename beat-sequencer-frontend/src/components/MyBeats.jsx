import React from 'react'; // Removed Link import, we'll use window.open
import apiClient from '../services/api';

function MyBeats({ onLoadBeat, currentUser }) {
  const [beats, setBeats] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!currentUser) return;
    const fetchBeats = async () => {
      try {
        const response = await apiClient.get('/api/beats', {
            // Keep your temp auth headers if you haven't switched to tokens yet
            auth: { username: 'myfirstuser', password: 'password123' } 
        });
        setBeats(response.data);
      } catch (err) {
        console.error("Failed to load beats:", err);
        setError("Could not load beats.");
      }
    };
    fetchBeats();
  }, [currentUser]);

  // NEW: Function to handle sharing
  const handleShare = async (beatId) => {
    try {
      // 1. Call backend to generate/get the share ID
      const response = await apiClient.post(`/api/beats/${beatId}/share`, {}, {
          auth: { username: 'myfirstuser', password: 'password123' }
      });
      
      // 2. The backend returns a string like "/api/beats/public/UUID"
      // We need to extract just the UUID to build our frontend URL
      const sharePath = response.data; // e.g., "/api/beats/public/550e8400-e29b..."
      const shareId = sharePath.split('/').pop(); // Get the last part (the UUID)

      // 3. Open the sharing page in a new tab
      const shareUrl = `/share/${shareId}`;
      window.open(shareUrl, '_blank');

    } catch (err) {
      console.error("Share failed:", err);
      alert("Could not generate share link.");
    }
  };

  return (
    <div style={{ margin: '2rem auto', padding: '1rem', maxWidth: '400px', background: '#242424', borderRadius: '8px' }}>
      <h3>My Saved Beats</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {beats.length === 0 ? <p style={{ color: '#888' }}>No beats saved yet.</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {beats.map(beat => (
            <li key={beat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid #333' }}>
              <span>{beat.name}</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => onLoadBeat(beat.pattern)}
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
                >
                  Load
                </button>
                
                {/* Updated Share Button */}
                <button 
                  onClick={() => handleShare(beat.id)}
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', backgroundColor: '#28a745', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
                >
                  Share
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBeats;