// src/hooks/useLocationInfo.js
import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

/**
 * Custom hook to manage location information based on Cesium camera movements.
 *
 * @param {Cesium.Viewer} viewer - The Cesium Viewer instance.
 * @param {object} Cesium - The Cesium library accessed via window.Cesium.
 * @param {Function} reverseGeocode - Function to perform reverse geocoding.
 * @param {string} language - Language code ('en' for English, 'ko' for Korean).
 * @returns {Object} - Contains locationInfo, loading, and error states.
 */
const useLocationInfo = (viewer, Cesium, reverseGeocode, language = 'en') => {
  // State to store location information
  const [locationInfo, setLocationInfo] = useState(null);
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // State to manage error messages
  const [error, setError] = useState(null);
  // Ref to store the debounced handler
  const handleCameraMoveEnd = useRef(null);

  useEffect(() => {
    // If any of the required dependencies are missing, exit early
    if (!viewer || !Cesium || !reverseGeocode) return;

    /**
     * Debounced function to handle camera movements.
     * This prevents excessive API calls during rapid camera movements.
     */
    handleCameraMoveEnd.current = debounce(async () => {
      setLoading(true);   // Start loading
      setError(null);     // Reset any previous errors

      const camera = viewer.camera;
      const ellipsoid = viewer.scene?.globe?.ellipsoid;

      // Safety checks to ensure camera and ellipsoid are defined
      if (!camera || !ellipsoid) {
        console.error('Camera or ellipsoid is not defined.');
        setError('Camera or ellipsoid not available');
        setLocationInfo({
          longitude: 'Unknown',
          latitude: 'Unknown',
          height: 'Unknown',
          zoomLevel: 'Unknown',
          address: 'Unknown',
        });
        setLoading(false);
        return;
      }

      try {
        // Get the current camera position in cartesian coordinates
        const cartesian = camera.positionWC;

        if (!cartesian) {
          console.error('Camera position is undefined.');
          setError('Camera position not available');
          setLocationInfo({
            longitude: 'Unknown',
            latitude: 'Unknown',
            height: 'Unknown',
            zoomLevel: 'Unknown',
            address: 'Unknown',
          });
          setLoading(false);
          return;
        }

        // Convert cartesian coordinates to cartographic (longitude, latitude, height)
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian, ellipsoid);

        if (!cartographic) {
          console.error('Failed to convert cartesian to cartographic.');
          setError('Conversion error');
          setLocationInfo({
            longitude: 'Unknown',
            latitude: 'Unknown',
            height: 'Unknown',
            zoomLevel: 'Unknown',
            address: 'Unknown',
          });
          setLoading(false);
          return;
        }

        // Convert radians to degrees and format to fixed decimal places
        const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
        const height = cartographic.height.toFixed(2); // Height in meters

        // Determine zoom level based on height
        let zoomLevel;
        if (height < 1000) {
          zoomLevel = 'Very High';
        } else if (height < 5000) {
          zoomLevel = 'High';
        } else if (height < 20000) {
          zoomLevel = 'Medium';
        } else {
          zoomLevel = 'Low';
        }

        // Perform reverse geocoding to get the address in the desired language
        const address = await reverseGeocode(latitude, longitude, language);

        // Update the location information state
        setLocationInfo({
          longitude,
          latitude,
          height,
          zoomLevel,
          address,
        });
      } catch (err) {
        // Handle any errors during the reverse geocoding process
        console.error('Reverse geocoding failed:', err);
        setError('Failed to fetch address');
        setLocationInfo({
          longitude: 'Unknown',
          latitude: 'Unknown',
          height: 'Unknown',
          zoomLevel: 'Unknown',
          address: 'Unknown',
        });
      } finally {
        setLoading(false); // Stop loading
      }
    }, 500); // 500ms debounce delay to optimize performance

    // Attach the debounced handler to the camera's moveEnd event
    viewer.camera.moveEnd.addEventListener(handleCameraMoveEnd.current);

    // Trigger an initial fetch of location information
    handleCameraMoveEnd.current();

    // Cleanup function to remove event listeners and cancel debounced functions on unmount
    return () => {
      viewer.camera.moveEnd.removeEventListener(handleCameraMoveEnd.current);
      handleCameraMoveEnd.current.cancel();
    };
  }, [viewer, Cesium, reverseGeocode, language]); // Re-run the effect if any dependencies change

  // Return the location information, loading status, and any errors
  return { locationInfo, loading, error };
};

export default useLocationInfo;
