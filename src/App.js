import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Simulating API request with a local JSON file
      const response = await fetch('./data.json');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 
  // Empty dependency array ensures useEffect runs only once on component mount

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Item List</h1>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
      {loading && <p className="text-center mt-3">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="d-flex flex-wrap justify-content-around mt-3">
       {/* Loop through items array and display each item in a card */}
        {items.map((item) => (
          <div key={item.id} className="card mb-3 bg-light" style={{ width: '18rem' }}>
            <div className="card-body ">
              <h2 className='card-id'>{item.id}</h2>
              <h3 className="card-title">{item.name}</h3>
              <p className="card-text">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
