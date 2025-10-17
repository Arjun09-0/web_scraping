import React, { useState, useEffect } from 'react';
import './App.css';

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
    fetch(`http://localhost:5000/memes?genre=${genre}&page=${pageNum}&limit=${memesPerPage}`)
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
    <div style={{ fontFamily: 'Arial', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Trending Memes</h1>
      <label style={{ marginBottom: 20 }}>
        Genre:
        <select value={genre} onChange={e => setGenre(e.target.value)} style={{ marginLeft: 10 }}>
          <option value="all">All</option>
          <option value="funny">Funny</option>
          <option value="wholesome">Wholesome</option>
          <option value="dank">Dank</option>
          <option value="gaming">Gaming</option>
          <option value="history">History</option>
          <option value="programming">Programming</option>
          <option value="cats">Cats</option>
          <option value="dogs">Dogs</option>
          <option value="anime">Anime</option>
        </select>
      </label>
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 350 }}>
        {meme ? (
          <div style={{ margin: 10, border: '1px solid #ccc', padding: 20, textAlign: 'center', background: '#222', color: '#fff' }}>
            <h2>{meme.title}</h2>
            {meme.url && <img src={meme.url} alt={meme.title} style={{ maxWidth: 400, maxHeight: 400, marginTop: 10 }} />}
          </div>
        ) : (
          <div style={{ margin: 10, border: '1px solid #ccc', padding: 20, textAlign: 'center', background: '#222', color: '#fff' }}>
            <h2>No memes found</h2>
          </div>
        )}
      </div>
      <div style={{ marginTop: 20 }}>
        <button onClick={handlePrev} disabled={page === 1} style={{ marginRight: 10 }}>Previous</button>
        <button onClick={handleNext} disabled={!meme || !meme.url}>Next</button>
      </div>
    </div>
  );
}

export default App;
