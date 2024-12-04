import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];
    setTrips(savedTrips);
  }, []);

  const handleAddNewTrip = () => {
    navigate('/trips/new'); 
  };

  const handleEditTrip = (index) => {
    navigate(`/trips/edit/${index}`); 
  };

  const handleDeleteTrip = (index) => {
    const updatedTrips = trips.filter((_, i) => i !== index);
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips)); 
  };

  return (
    <div className="container">
      <h2>Your Trips</h2>
      <p>Here you can add, edit, or delete your trips.</p>
      <button onClick={handleAddNewTrip}>Add New Trip</button>
      <ul>
        {trips.map((trip, index) => (
          <li key={index}>
            <h3>{trip.destination}</h3>
            <p>
              {trip.startDate} to {trip.endDate}
            </p>
            <button onClick={() => handleEditTrip(index)}>Edit</button>
            <button onClick={() => handleDeleteTrip(index)}>Delete</button>
          </li>
        ))}
      </ul>
      {trips.length === 0 && <p>No trips found. Start by adding a new trip!</p>}
    </div>
  );
};

export default TripList;
