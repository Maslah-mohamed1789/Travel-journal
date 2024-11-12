// App.js
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Header from './components/Header';
import Search from './components/Search';
import TravelList from './components/TravelList';
import TravelEntry from './components/TravelEntry';

const App = () => {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isAddingTrip, setIsAddingTrip] = useState(false);

  useEffect(() => {
    // Fetch trips data from backend
    const fetchTrips = async () => {
      // const result = await axios.get('http://localhost:5000/trips');
      // setTrips(result.data);
    };
    fetchTrips();
  }, []);

  const handleSelectTrip = (id) => {
    const trip = trips.find(trip => trip.id === id);
    setSelectedTrip(trip);
    setIsAddingTrip(false);
  };

  const handleAddNewTrip = () => {
    setSelectedTrip(null);
    setIsAddingTrip(true);
  };

  const handleSaveTrip = async () => {
    // const result = await axios.get('http://localhost:5000/trips');
    // setTrips(result.data);
    setSelectedTrip(null);
    setIsAddingTrip(false);
  };

  return (
    <div>
      <Header />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button onClick={handleAddNewTrip}>Add New Trip</button>
      <TravelList trips={trips} searchTerm={searchTerm} onSelectTrip={handleSelectTrip} />
      {(isAddingTrip || selectedTrip) && (
        <TravelEntry
          selectedTrip={selectedTrip}
          onSaveTrip={handleSaveTrip}
          onCancel={() => { setIsAddingTrip(false); setSelectedTrip(null); }}
        />
      )}
    </div>
  );
};

export default App;
