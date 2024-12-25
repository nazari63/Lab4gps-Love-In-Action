// src/components/ProblemAlert/SubmitProblem.js

import React, { useState, useEffect, useRef, useContext } from 'react';
import '../styles/SubmitProblem.css';
import { ModalContext } from '../Context/ModalContext'; // Import ModalContext
import { useLang } from '../Context/LangContext'; // Import useLang from LangContext

const SubmitProblem = () => {
  // State variables for form fields
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

  // New state variables to handle custom categories
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  // State variables for address search
  const [addressQuery, setAddressQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState('');

  // Reference for debouncing
  const debounceRef = useRef(null);

  // Access ModalContext to close the modal after submission if needed
  const { closeSubmitProblem } = useContext(ModalContext);

  // Access LangContext to get the current language
  const { language } = useLang(); // 'en' for English, 'ko' for Korean

  // Handle changes in the media files input
  const handleMediaChange = (e) => {
    setMediaFiles(e.target.files);
  };

  // Handle changes in the submitter photo input
  const handlePhotoChange = (e) => {
    setSubmitterPhoto(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // If the user selected "Other" in the dropdown, use the customCategory value
    let finalCategory = category;
    if (isCustomCategory && customCategory.trim() !== '') {
      finalCategory = customCategory;
    }

    // TODO: Implement actual form submission logic here (e.g., send data to backend)
    console.log({
      problemTitle,
      location: { country, city, coordinates },
      description,
      category: finalCategory, // use the final value for category
      urgency,
      mediaFiles,
      submitterPhoto,
      contactInfo: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
      },
    });

    // Optionally, close the modal after submission
    // closeSubmitProblem();
  };

  // Handle map selector button click (if still needed)
  const handleMapSelectorClick = () => {
    // Placeholder logic: In a real application, this might open a map interface
    // For demonstration, we'll set some dummy coordinates
    setCoordinates({ lat: '1.2921', lng: '36.8219' });
  };

  // Handle changes in the address search input
  const handleAddressChange = (e) => {
    const query = e.target.value;
    setAddressQuery(query);
  };

  // Handle selection of a suggestion
  const handleSuggestionSelect = (suggestion) => {
    setAddressQuery(suggestion.formatted);
    setCountry(suggestion.components.country || '');
    setCity(
      suggestion.components.city ||
        suggestion.components.town ||
        suggestion.components.village ||
        ''
    );
    setCoordinates({
      lat: suggestion.geometry.lat,
      lng: suggestion.geometry.lng,
    });
    setSuggestions([]);
    setIsSuggestionsVisible(false);
  };

  // Fetch suggestions from OpenCage Geocoding API
  useEffect(() => {
    if (addressQuery.trim() === '') {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
      return;
    }

    // Debounce the API call by 500ms
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const fetchSuggestions = async () => {
        setIsLoadingSuggestions(true);
        setSuggestionsError('');
        try {
          const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY; // Ensure this is set in your environment variables
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
              addressQuery
            )}&key=${apiKey}&limit=5&no_annotations=1&language=${
              language === 'ko' ? 'ko' : 'en'
            }`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch suggestions');
          }

          const data = await response.json();
          if (data.results) {
            setSuggestions(data.results);
            setIsSuggestionsVisible(true);
          } else {
            setSuggestions([]);
            setIsSuggestionsVisible(false);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestionsError('Error fetching address suggestions.');
          setSuggestions([]);
          setIsSuggestionsVisible(false);
        } finally {
          setIsLoadingSuggestions(false);
        }
      };

      fetchSuggestions();
    }, 500);

    // Cleanup the timeout on unmount or when addressQuery changes
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [addressQuery, language]);

  // Close suggestions dropdown when clicking outside
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setIsSuggestionsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle category selection (including "Other" option)
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory === 'other') {
      setIsCustomCategory(true);
    } else {
      setIsCustomCategory(false);
      setCustomCategory(''); // Reset the custom category input when not "Other"
    }
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

        {/* Address Search */}
        <div className="form-group address-search-group" ref={wrapperRef}>
          <label htmlFor="addressSearch">Address</label>
          <input
            type="text"
            id="addressSearch"
            placeholder="Search for an address..."
            value={addressQuery}
            onChange={handleAddressChange}
            onFocus={() => {
              if (suggestions.length > 0) setIsSuggestionsVisible(true);
            }}
            autoComplete="off"
          />
          {isLoadingSuggestions && <div className="loading">Loading...</div>}
          {suggestionsError && (
            <div className="error-message">{suggestionsError}</div>
          )}
          {isSuggestionsVisible && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  {suggestion.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Coordinates Display */}
        {coordinates.lat && coordinates.lng && (
          <div className="form-group coordinates-display">
            <strong>Selected Coordinates:</strong> Lat: {coordinates.lat}, Lng: {coordinates.lng}
          </div>
        )}

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
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select a Category</option>
            <option value="Water Scarcity">Water Scarcity</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Environment">Environment</option>
            {/* "Other" option to allow custom category */}
            <option value="other">Other (Please specify)</option>
          </select>
        </div>

        {/* Conditional text input for custom category */}
        {isCustomCategory && (
          <div className="form-group">
            <label htmlFor="customCategory">Custom Category</label>
            <input
              type="text"
              id="customCategory"
              placeholder="Type your custom category..."
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          </div>
        )}

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
