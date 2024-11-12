// Search.js
import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => (
  <div style={{ padding: '1rem' }}>
    <input
      type="text"
      placeholder="Search trips..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: '100%', padding: '0.5rem' }}
    />
  </div>
);

export default Search;
