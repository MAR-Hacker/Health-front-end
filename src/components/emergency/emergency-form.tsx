"use client";
import React, { useState } from 'react';

const EmergencyForm = () => {
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emergencyType, setEmergencyType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({ location, contactNumber, emergencyType });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book an Ambulance</h2>
      <div>
        <label htmlFor="location">Pickup Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="tel"
          id="contactNumber"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="emergencyType">Type of Emergency:</label>
        <select
          id="emergencyType"
          value={emergencyType}
          onChange={(e) => setEmergencyType(e.target.value)}
          required
        >
          <option value="">Select...</option>
          <option value="medical">Medical Emergency</option>
          <option value="accident">Accident</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit">Request Ambulance</button>
    </form>
  );
};

export default EmergencyForm;