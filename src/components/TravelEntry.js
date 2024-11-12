// TravelEntry.js
import React, { useState } from 'react';
import axios from 'axios';

const TravelEntry = ({ selectedTrip, onSaveTrip, onCancel }) => {
    const [trip, setTrip] = useState(
        selectedTrip || { destination: '', date: '', notes: '' }
    );

    const handleChange = (e) => {
        setTrip({ ...trip, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedTrip) {
            await axios.put(`http://localhost:5000/trips/${selectedTrip.id}`, trip);
        } else {
            await axios.post('http://localhost:5000/trips', trip);
        }
        onSaveTrip();
    };

    return (
        <div style={{ padding: '1rem', border: '1px solid #ddd', marginTop: '1rem' }}>
            <h2>{selectedTrip ? 'Edit Trip' : 'Add New Trip'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        value={trip.destination}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={trip.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea
                        name="notes"
                        value={trip.notes}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <button type="submit">Save Trip</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default TravelEntry;
