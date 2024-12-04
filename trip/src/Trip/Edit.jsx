import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

const EditTrip = () => {
  const { index } = useParams(); 
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];
    setTrip(savedTrips[index]);
  }, [index]);

  const handleSave = () => {
    if (!trip.destination || !trip.startDate || !trip.endDate) {
      alert('Please fill in all fields.');
      return;
    }

    const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];
    savedTrips[index] = trip; 
    localStorage.setItem('trips', JSON.stringify(savedTrips));

    alert('Trip updated successfully!');
    navigate('/trips');
  };

  const handleChange = (field, value) => {
    setTrip({ ...trip, [field]: value });
  };

  return (
    <div className="container">
      <h2>Edit Trip</h2>
      {trip ? (
        <>
          <input
            type="text"
            placeholder="Destination"
            value={trip.destination}
            onChange={(e) => handleChange('destination', e.target.value)}
          />
          <input
            type="date"
            value={trip.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
          />
          <input
            type="date"
            value={trip.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
          />
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={() => navigate('/trips')}>Cancel</button>
        </>
      ) : (
        <p>Loading trip details...</p>
      )}
    </div>
  );
};

export default EditTrip;
