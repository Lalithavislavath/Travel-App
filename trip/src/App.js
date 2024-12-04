import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Trip/Login';
import Signup from './Trip/Sign';
import Dashboard from './Trip/Dash';
import TripList from './Trip/TripList';
import TripDetail from './Trip/TripDetails';
import EditTrip from './Trip/Edit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/trips/:id" element={<TripDetail />} />
        <Route path="/trips/edit/:index" element={<EditTrip />} />
      </Routes>
    </Router>
  );
};

export default App;
