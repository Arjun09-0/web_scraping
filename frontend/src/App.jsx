import React, { useState, useEffect } from 'react';
import './App.css';

const genres = [
  { value: 'all', label: 'All Memes' },
  { value: 'funny', label: 'Funny' },
  { value: 'wholesome', label: 'Wholesome' },
  { value: 'dank', label: 'Dank' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'history', label: 'History' },
  { value: 'programming', label: 'Programming' },
  { value: 'cats', label: 'Cats' },
  { value: 'dogs', label: 'Dogs' },
  { value: 'anime', label: 'Anime' },
];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [genre, setGenre] = useState('all');
  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);
  const memesPerPage = 1;

  useEffect(() => {
    setPage(1);
    fetchMemes(1);
  }, [genre]);

  const fetchMemes = (pageNum) => {
    fetch(`${API_URL}/memes?genre=${genre}&page=${pageNum}&limit=${memesPerPage}`)
      .then(res => res.json())
      .then(data => setMemes(data));
  };

  const handleNext = () => {
    setPage(prev => {
      const nextPage = prev + 1;
      fetchMemes(nextPage);
      return nextPage;
    });
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(prev => {
        const prevPage = prev - 1;
        fetchMemes(prevPage);
        return prevPage;
      });
    }
  };

  const meme = memes[0];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a2332 0%, #232946 100%)',
      color: '#eaf0fb',
      fontFamily: 'Inter, Arial, sans-serif',
      padding: '0',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{
          fontSize: '2.8em',
          fontWeight: 700,
          color: 'rgba(0, 212, 255, 0.85)',
          marginBottom: 0,
        }}>
          Meme <span style={{ color: '#3be7ff' }}>Gallery</span>
        </h1>
        <p style={{
          fontSize: '1.2em',
          color: '#b8c1ec',
          marginTop: 8,
          marginBottom: 32,
        }}>
          Discover trending memes across genres
        </p>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontWeight: 500, fontSize: '1.1em', marginRight: 16 }}>Genre</span>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '12px',
          }}>
            {genres.map(g => (
              <button
                key={g.value}
                onClick={() => setGenre(g.value)}
                style={{
                  background: genre === g.value ? 'linear-gradient(90deg, #1cb5e0 0%, #000851 100%)' : '#232946',
                  color: genre === g.value ? '#eaf0fb' : '#b8c1ec',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '1em',
                  fontWeight: 500,
                  cursor: 'pointer',
                  boxShadow: genre === g.value ? '0 2px 8px #1cb5e055' : 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{
          background: '#232946',
          borderRadius: '16px',
          boxShadow: '0 4px 24px #0004',
          minHeight: 250,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: meme && meme.url ? 'flex-start' : 'center',
          padding: '32px 16px',
          marginBottom: 32,
        }}>
          {meme && meme.url ? (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h2 style={{ color: '#eaf0fb', marginBottom: 16 }}>{meme.title}</h2>
              <img src={meme.url} alt={meme.title} style={{
                maxWidth: '400px',
                maxHeight: '400px',
                borderRadius: '12px',
                boxShadow: '0 2px 12px #0006',
                marginTop: 10,
              }} />
            </div>
          ) : (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h2 style={{ color: '#b8c1ec', fontWeight: 400 }}>No memes found in this genre</h2>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={handlePrev}
            disabled={page === 1}
            style={{
              background: '#232946',
              color: '#b8c1ec',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontSize: '1em',
              fontWeight: 500,
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!meme || !meme.url}
            style={{
              background: '#232946',
              color: '#b8c1ec',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontSize: '1em',
              fontWeight: 500,
              cursor: (!meme || !meme.url) ? 'not-allowed' : 'pointer',
              opacity: (!meme || !meme.url) ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
