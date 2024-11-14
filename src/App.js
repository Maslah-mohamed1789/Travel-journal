import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import AlreadyTravelled from './components/AlreadyTravelledAPI';
import Wishlist from './components/WishlistAPI';
import ErrorPage from './components/ErrorPage';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch('http://localhost:3000/entries');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(true);
      }
    };
    fetchEntries();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const hasResults = entries.some(entry =>
      entry.destination && entry.destination.toLowerCase().includes(term.toLowerCase())
    );
    setNoResults(!hasResults);
  };

  const handlePost = async (newEntry) => {
    try {
      const res = await fetch('http://localhost:3000/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newEntry, status: 'Wishlist' }),
      });
      const postedEntry = await res.json();
      setEntries((prevEntries) => [...prevEntries, postedEntry]);
    } catch (err) {
      console.error('Error posting entry:', err);
      setError(true);
    }
  };

  const filteredEntries = (status) =>
    entries.filter(
      (entry) =>
        entry.status === status &&
        entry.destination &&
        entry.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (error) return <ErrorPage />;

  return (
    <Router>
      <div className="app-container">
        <div className="header-navbar-container">
          <Header />
          <Navbar />
        </div>
        <Search onSearch={handleSearch} noResults={noResults} setNoResults={setNoResults} />
        {noResults && <div className="no-results">No destination found...</div>}

        <Routes>
          <Route path="/" element={
            <>
              <div className="columns-container">
                <div className="column">
                  <AlreadyTravelled
                    entries={filteredEntries('Already Travelled')}
                    setEntries={setEntries}
                  />
                </div>
                <div className="column">
                  <Wishlist
                    entries={filteredEntries('Wishlist')}
                    onPost={handlePost}
                    setEntries={setEntries} 
                  />
                </div>
              </div>
            </>
          } />
          <Route path="/wishlist" element={
            <div className="columns-container">
              <div className="column">
                <Wishlist
                  entries={filteredEntries('Wishlist')}
                  onPost={handlePost}
                  setEntries={setEntries} 
                />
              </div>
            </div>
          } />
          <Route path="/already-travelled" element={
            <div className="columns-container">
              <div className="column">
                <AlreadyTravelled
                  entries={filteredEntries('Already Travelled')}
                  setEntries={setEntries}
                />
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
