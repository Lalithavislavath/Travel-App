import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const TripDetail = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [companions, setCompanions] = useState([]);
  const [newExpense, setNewExpense] = useState('');
  const [newCompanion, setNewCompanion] = useState('');
  const [editingExpenseIndex, setEditingExpenseIndex] = useState(null);
  const [editingCompanionIndex, setEditingCompanionIndex] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0); 
  const [totalCompanions, setTotalCompanions] = useState(0);
  const navigate = useNavigate();

  const handleSaveTrip = () => {
    if (!destination || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert('End date cannot be before start date.');
      return;
    }

    const newTrip = {
      destination,
      startDate,
      endDate,
      expenses,
      companions,
    };

    const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];
    savedTrips.push(newTrip);
    localStorage.setItem('trips', JSON.stringify(savedTrips));

    alert('Trip added successfully!');
    navigate('/trips');
  };

  const handleAddExpense = () => {
    if (newExpense.trim()) {
      const expenseValue = parseFloat(newExpense);
      if (isNaN(expenseValue)) {
        alert('Please enter a valid expense amount.');
        return;
      }

      if (editingExpenseIndex !== null) {
        
        const updatedExpenses = [...expenses];
        updatedExpenses[editingExpenseIndex] = newExpense;
        setExpenses(updatedExpenses);
        setEditingExpenseIndex(null);
      } else {
        
        setExpenses([...expenses, newExpense]);
      }

      setTotalExpenses(prevTotal => prevTotal + expenseValue); 
      setNewExpense('');
    }
  };

  const handleEditExpense = (index) => {
    setNewExpense(expenses[index]);
    setEditingExpenseIndex(index);
  };

  const handleRemoveExpense = (index) => {
    const expenseValue = parseFloat(expenses[index]);
    setExpenses(expenses.filter((_, i) => i !== index));
    setTotalExpenses(prevTotal => prevTotal - expenseValue); 
  };

  const handleAddCompanion = () => {
    if (newCompanion.trim()) {
      if (editingCompanionIndex !== null) {
        
        const updatedCompanions = [...companions];
        updatedCompanions[editingCompanionIndex] = newCompanion;
        setCompanions(updatedCompanions);
        setEditingCompanionIndex(null);
      } else {
        
        setCompanions([...companions, newCompanion]);
      }

      setTotalCompanions(prevTotal => prevTotal + 1); 
      setNewCompanion('');
    }
  };

  const handleEditCompanion = (index) => {
    setNewCompanion(companions[index]);
    setEditingCompanionIndex(index);
  };

  const handleRemoveCompanion = (index) => {
    setCompanions(companions.filter((_, i) => i !== index));
    setTotalCompanions(prevTotal => prevTotal - 1); 
  };

  return (
    <div className="container">
      <h2>Add New Trip</h2>
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <div>
        <h3>Expenses</h3>
        <input
          type="text"
          placeholder="Add Expense"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
        />
        <button onClick={handleAddExpense}>
          {editingExpenseIndex !== null ? 'Save Expense' : 'Add Expense'}
        </button>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense}{' '}
              <button onClick={() => handleEditExpense(index)}>Edit</button>
              <button onClick={() => handleRemoveExpense(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <h4>Total Expenses: Rs{totalExpenses.toFixed(2)}</h4>
      </div>
      <div>
        <h3>Travel Companions</h3>
        <input
          type="text"
          placeholder="Add Companion"
          value={newCompanion}
          onChange={(e) => setNewCompanion(e.target.value)}
        />
        <button onClick={handleAddCompanion}>
          {editingCompanionIndex !== null ? 'Save Companion' : 'Add Companion'}
        </button>
        <ul>
          {companions.map((companion, index) => (
            <li key={index}>
              {companion}{' '}
              <button onClick={() => handleEditCompanion(index)}>Edit</button>
              <button onClick={() => handleRemoveCompanion(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <h4>Total Companions: {totalCompanions}</h4> 
      </div>
      <button onClick={handleSaveTrip}>Save Trip</button>
      <button onClick={() => navigate('/trips')}>Cancel</button>
    </div>
  );
};

export default TripDetail;
