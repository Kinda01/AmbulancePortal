// src/components/DispatcherInfoPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dispatcher.css';

const DispatcherInfoPage = () => {
  const [dispatcherData, setDispatcherData] = useState(null);

  // Fetch dispatcher data from your backend
  useEffect(() => {
    // You can replace the endpoint with your actual backend API endpoint
    axios.get('/api/dispatcher-info')
      .then(response => {
        setDispatcherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching dispatcher data:', error);
      });
  }, []);

  if (!dispatcherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dispatcher-container">
      <h2>Dispatcher Team Information</h2>
      <div className="dispatcher-summary">
        <h3>Dispatcher ID: {dispatcherData.id}</h3>
        <p>Name: {dispatcherData.name}</p>
        <p>Phone: {dispatcherData.phone}</p>
        <p>Location: {dispatcherData.location}</p>
        {/* Add more fields as required */}
      </div>

      <div className="dispatcher-sidebar">
        <h2>Dispatcher Team</h2>
        <button>Home</button>
        <button>Triage</button>
        <button>Ambulance Journal</button>
        <button>Nurse Report</button>
      </div>
    </div>
  );
};

export default DispatcherInfoPage;
