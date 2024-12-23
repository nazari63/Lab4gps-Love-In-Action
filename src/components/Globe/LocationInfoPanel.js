// src/components/Globe/LocationInfoPanel.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/LocationInfoPanel.css'; // Import the dedicated CSS file

const LocationInfoPanel = ({ locationInfo, loading, error, translate }) => {
  if (loading) {
    return (
      <div className="location-info-panel">
        <h2>{translate('locationDetails')}</h2>
        <p>{translate('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="location-info-panel">
        <h2>{translate('locationDetails')}</h2>
        <p className="error-message">{`${translate('error')}: ${error}`}</p>
      </div>
    );
  }

  if (!locationInfo) {
    return null;
  }

  return (
    <div className="location-info-panel">
      <h2>{translate('locationDetails')}</h2>
      <p>
        <strong>{translate('address')}:</strong> {locationInfo.address}
      </p>
      <p>
        <strong>{translate('latitude')}:</strong> {locationInfo.latitude}
      </p>
      <p>
        <strong>{translate('longitude')}:</strong> {locationInfo.longitude}
      </p>
      <p>
        <strong>{translate('height')}:</strong> {locationInfo.height} meters
      </p>
      <p>
        <strong>{translate('zoomLevel')}:</strong> {locationInfo.zoomLevel}
      </p>
    </div>
  );
};

LocationInfoPanel.propTypes = {
  locationInfo: PropTypes.shape({
    address: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    zoomLevel: PropTypes.string.isRequired,
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  translate: PropTypes.func.isRequired,
};

LocationInfoPanel.defaultProps = {
  error: null,
};

export default LocationInfoPanel;
