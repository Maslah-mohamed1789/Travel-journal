import React, { useState } from 'react';
import './AlreadyTravelled.css';

const AlreadyTravelled = ({ entries, setEntries }) => {
  const [updatedFields, setUpdatedFields] = useState({
    id: null,
    description: '',
    budget: '',
    imageUrl: ''
  });

  const handleEdit = (entry) => {
    
    setUpdatedFields({
      id: entry.id,
      description: entry.description,
      budget: entry.budget,
      imageUrl: entry.imageUrl
    });
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Deleting entry with ID: ${id}`);
      await fetch(`http://localhost:3000/entries/${id}`, {
        method: 'DELETE',
      });
      setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const handleUpdate = async () => {
    if (updatedFields.id) {
      const originalEntry = entries.find((entry) => entry.id === updatedFields.id);
      const updatedEntry = {
        ...originalEntry, 
        ...updatedFields, 
      };

      try {
        const res = await fetch(`http://localhost:3000/entries/${updatedFields.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedEntry),
        });

        if (res.ok) {
          const updatedEntryFromDB = await res.json();
          console.log('Updated entry from backend:', updatedEntryFromDB);
          setEntries((prevEntries) =>
            prevEntries.map((entry) =>
              entry.id === updatedFields.id ? updatedEntryFromDB : entry
            )
          );
          setUpdatedFields({ id: null, description: '', budget: '', imageUrl: '' });
        } else {
          console.error('Failed to update entry');
        }
      } catch (err) {
        console.error('Error updating entry:', err);
      }
    }
  };

  const handleCancel = () => {
    setUpdatedFields({ id: null, description: '', budget: '', imageUrl: '' });
  };

  return (
    <div className="already-travelled-container">
      <h2>Already Travelled</h2>
      <div className="entries-container">
        {entries.map((entry) => (
          <div key={entry.id} className="travelled-entry">
            <img src={entry.imageUrl} alt={entry.destination} />
            <h3>{entry.destination}</h3>
            <p>{entry.description}</p>
            <p>Budget: ${entry.budget}</p>
            <div className="button-container">
              <button className="delete-button" onClick={() => handleDelete(entry.id)}>
                Delete
              </button>
              <button className="edit-button" onClick={() => handleEdit(entry)}>
                Edit
              </button>
            </div>

            {updatedFields.id === entry.id && (
              <div className="edit-section">
                <h4>Edit Entry</h4>
                <input
                  type="text"
                  placeholder="Updated Description"
                  value={updatedFields.description}
                  onChange={(e) =>
                    setUpdatedFields({ ...updatedFields, description: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Updated Budget"
                  value={updatedFields.budget}
                  onChange={(e) =>
                    setUpdatedFields({ ...updatedFields, budget: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Updated Image URL"
                  value={updatedFields.imageUrl}
                  onChange={(e) =>
                    setUpdatedFields({ ...updatedFields, imageUrl: e.target.value })
                  }
                />
                <button className="save-button" onClick={handleUpdate}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlreadyTravelled;
