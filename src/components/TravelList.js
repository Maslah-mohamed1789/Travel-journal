// TravelList.js
import React from 'react';

const TravelList = ({ trips, searchTerm, onSelectTrip }) => {
  const filteredTrips = trips.filter(trip => 
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Trips</h2>
      {filteredTrips.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredTrips.map(trip => (
            <li
              key={trip.id}
              onClick={() => onSelectTrip(trip.id)}
              style={{ margin: '0.5rem 0', padding: '0.5rem', cursor: 'pointer', border: '1px solid #ddd' }}
            >
              <strong>{trip.destination}</strong> - {trip.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No trips found.</p>
      )}
    </div>
  );
};

export default TravelList;
