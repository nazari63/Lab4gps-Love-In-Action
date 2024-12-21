import React, { useState } from 'react';
import './SubmitProblem.css';

const SubmitProblem = () => {
  const [problemTitle, setProblemTitle] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [submitterPhoto, setSubmitterPhoto] = useState(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleMediaChange = (e) => {
    setMediaFiles(e.target.files);
  };

  const handlePhotoChange = (e) => {
    setSubmitterPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic here
    console.log({
      problemTitle,
      location: { country, city, coordinates },
      description,
      category,
      urgency,
      mediaFiles,
      submitterPhoto,
      contactInfo: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
      },
    });
  };

  // A placeholder map selector to illustrate capturing coordinates
  const handleMapSelectorClick = () => {
    // Sample logic: Might open a modal or trigger a map interface
    // For now, we'll just set some dummy coordinates
    setCoordinates({ lat: '1.2921', lng: '36.8219' });
  };

  return (
    <div className="submit-problem-container">
      <h1 className="submit-problem-title">Submit a Problem</h1>
      <form className="submit-problem-form" onSubmit={handleSubmit}>
        {/* Problem Title */}
        <div className="form-group">
          <label htmlFor="problemTitle">Problem Title</label>
          <input
            type="text"
            id="problemTitle"
            placeholder="Critical Water Shortage in Nairobi"
            value={problemTitle}
            onChange={(e) => setProblemTitle(e.target.value)}
            required
          />
        </div>

        {/* Location Fields */}
        <div className="form-group location-fields">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select a Country</option>
            <option value="Kenya">Kenya</option>
            <option value="USA">USA</option>
            <option value="Brazil">Brazil</option>
            {/* Add more countries as needed */}
          </select>

          <label htmlFor="city">City</label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option value="">Select a City</option>
            {/* Filter or list cities based on country selection */}
            <option value="Nairobi">Nairobi</option>
            <option value="New York">New York</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
            {/* Add more cities as needed */}
          </select>

          {/* Coordinates (set via a map selector for accurate lat/lng) */}
          <button 
            type="button"
            className="map-selector-button"
            onClick={handleMapSelectorClick}
          >
            Select Location on Map
          </button>
          <p className="coordinates-display">
            {coordinates.lat && coordinates.lng
              ? `Lat: ${coordinates.lat}, Lng: ${coordinates.lng}`
              : 'Coordinates not set'}
          </p>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Problem Description</label>
          <textarea
            id="description"
            placeholder="Describe the problem in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            <option value="Water Scarcity">Water Scarcity</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Environment">Environment</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        {/* Urgency Level */}
        <div className="form-group">
          <label htmlFor="urgency">Urgency Level</label>
          <select
            id="urgency"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            required
          >
            <option value="">Select Urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {/* Photos / Videos Upload */}
        <div className="form-group">
          <label htmlFor="mediaFiles">Photos / Videos of the Problem</label>
          <input
            type="file"
            id="mediaFiles"
            multiple
            accept="image/*,video/*"
            onChange={handleMediaChange}
          />
        </div>

        {/* Optional Photo of Submitter */}
        <div className="form-group">
          <label htmlFor="submitterPhoto">Your Photo (Optional)</label>
          <input
            type="file"
            id="submitterPhoto"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>

        {/* Contact Information */}
        <div className="contact-info-group">
          <h2>Contact Information</h2>
          <div className="form-group">
            <label htmlFor="contactName">Name</label>
            <input
              type="text"
              id="contactName"
              placeholder="John Doe"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactEmail">Email</label>
            <input
              type="email"
              id="contactEmail"
              placeholder="john.doe@example.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactPhone">Phone Number</label>
            <input
              type="tel"
              id="contactPhone"
              placeholder="+1 555-123-4567"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-problem-button">
          Submit Problem
        </button>
      </form>
    </div>
  );
};

export default SubmitProblem;
