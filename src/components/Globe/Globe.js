/* global window */
import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../Context/LangContext'; // Adjust the path based on your project structure
import '../styles/Globe.css'; // Import the separate style file
import useLocationInfo from '../hooks/useLocationInfo'; // Adjust the path based on your project structure
import LocationInfoPanel from './LocationInfoPanel'; // Import the LocationInfoPanel component
import PropTypes from 'prop-types';

/**
 * Function to perform reverse geocoding using OpenCage Geocoding API.
 * In production, it's recommended to handle this on the backend to secure the API key.
 *
 * @param {string} latitude
 * @param {string} longitude
 * @param {string} language - Language code ('en' for English, 'ko' for Korean)
 * @returns {Promise<string>} - Returns the formatted address in the desired language.
 */
const reverseGeocode = async (latitude, longitude, language = 'en') => {
  const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY; // Ensure this is set in .env
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=${language}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].formatted;
    } else {
      return 'Address not found';
    }
  } catch (error) {
    console.error('Error in reverse geocoding:', error);
    throw error;
  }
};

const Globe = () => {
  const globeRef = useRef(null); // Reference to the Cesium container div
  const viewerRef = useRef(null); // Reference to the Cesium Viewer instance
  const animationIdRef = useRef(null); // Reference to the animation frame ID

  // State to manage rotation status
  const [isRotating, setIsRotating] = useState(true);

  // Use the global language context to determine if text should be English or Korean
  const { language } = useLang();

  // Inline dictionary for multi-language support
  const text = {
    en: {
      stopRotation: "Stop Rotation",
      startRotation: "Start Rotation",
      locationDetails: "Location Details",
      address: "Address",
      latitude: "Latitude",
      longitude: "Longitude",
      height: "Height",
      zoomLevel: "Zoom Level",
      unknown: "Unknown",
      loading: "Loading...",
      error: "Error",
    },
    ko: {
      stopRotation: "회전 중지",
      startRotation: "회전 시작",
      locationDetails: "위치 정보",
      address: "주소",
      latitude: "위도",
      longitude: "경도",
      height: "높이",
      zoomLevel: "확대 수준",
      unknown: "알 수 없음",
      loading: "로딩 중...",
      error: "오류",
    },
  };

  // Helper function to return the correct text based on the current language
  const t = (key) => text[language][key];

  /**
   * Function to handle rotation toggle.
   * Starts or stops the Earth's rotation based on current state.
   */
  const handleRotationToggle = () => {
    if (isRotating) {
      // Stop rotation
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      setIsRotating(false);
    } else {
      // Start rotation
      if (!animationIdRef.current && viewerRef.current) {
        const rotateEarth = () => {
          const spinRate = 0.01;
          const delta = spinRate / 60; // Assuming 60 FPS
          // Correctly reference Cesium via window.Cesium
          viewerRef.current.scene.camera.rotate(window.Cesium.Cartesian3.UNIT_Z, -delta);
          animationIdRef.current = requestAnimationFrame(rotateEarth);
        };
        rotateEarth();
      }
      setIsRotating(true);
    }
  };

  /**
   * Hide or show other site elements (Navbar, Footer, Home text, etc.)
   * based on whether we're in fullscreen mode.
   */
  const toggleElementsVisibility = (hide) => {
    // List any CSS selectors you want hidden in fullscreen
    const selectors = [
      '.navbar',    // Navbar
      '.footer',    // Footer
      '.intro',     // Intro section in Home.js
      '.features'   // Features section in Home.js
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((elem) => {
        // If hide === true => display: 'none'
        // If hide === false => display: ''
        elem.style.display = hide ? 'none' : '';
      });
    });
  };

  /**
   * Check for 'fullscreenchange' events:
   * if document.fullscreenElement is set, we hide other site elements;
   * otherwise, we restore them.
   */
  const handleFullScreenChange = () => {
    const isFullScreen = !!document.fullscreenElement;
    toggleElementsVisibility(isFullScreen);
  };

  // Initialize Cesium Viewer and handle rotation controls
  useEffect(() => {
    // Ensure Cesium is loaded
    if (!window.Cesium) {
      console.error('Cesium.js is not loaded. Please check your script tags.');
      return;
    }

    // Set your Cesium Ion access token from environment variables
    window.Cesium.Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_ION_ACCESS_TOKEN;

    // Listen for the 'fullscreenchange' event on the document
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    // Initialize Cesium Viewer if it doesn't exist yet
    if (globeRef.current && !viewerRef.current) {
      try {
        viewerRef.current = new window.Cesium.Viewer(globeRef.current, {
          terrainProvider: window.Cesium.createWorldTerrain(), // High-resolution terrain
          imageryProvider: new window.Cesium.IonImageryProvider({ assetId: 2 }), // Example asset ID
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          infoBox: false, // We'll handle info boxes manually
          navigationHelpButton: false,
          sceneModePicker: false,
          timeline: false,
          animation: false,
          fullscreenButton: true, // Enable fullscreen
          requestRenderMode: true,
          maximumRenderTimeChange: Infinity,
        });

        // Check if the Viewer was successfully created
        if (!viewerRef.current || !viewerRef.current.scene) {
          console.error('Cesium Viewer was not initialized correctly.');
          return;
        }

        // Set initial camera view (New York coordinates as example)
        viewerRef.current.camera.setView({
          destination: window.Cesium.Cartesian3.fromDegrees(
            -74.0707383,
            40.7117244,
            10000000
          ),
          orientation: {
            heading: window.Cesium.Math.toRadians(0),
            pitch: window.Cesium.Math.toRadians(-90),
            roll: 0.0,
          },
        });

        // Continuous rotation
        const rotateEarth = () => {
          const spinRate = 0.01;
          const delta = spinRate / 60; // 60 FPS assumption
          viewerRef.current.scene.camera.rotate(window.Cesium.Cartesian3.UNIT_Z, -delta);
          animationIdRef.current = requestAnimationFrame(rotateEarth);
        };

        rotateEarth(); // Start rotation immediately

        // Scene interactions to stop/start rotation on user actions
        viewerRef.current.scene.screenSpaceCameraController.inertiaSpin = 0;
        viewerRef.current.scene.screenSpaceCameraController.inertiaTranslate = 0;
        viewerRef.current.scene.screenSpaceCameraController.inertiaZoom = 0;

        const stopRotation = () => {
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
            setIsRotating(false);
          }
        };

        const startRotation = () => {
          if (!animationIdRef.current) {
            rotateEarth();
            setIsRotating(true);
          }
        };

        // Stop rotation on pointer down/wheel
        viewerRef.current.canvas.addEventListener('pointerdown', stopRotation);
        viewerRef.current.canvas.addEventListener('wheel', stopRotation, { passive: true });

        // Resume rotation on pointer up/wheel end
        viewerRef.current.canvas.addEventListener('pointerup', startRotation);
        viewerRef.current.canvas.addEventListener('wheel', startRotation, {
          passive: true,
          capture: true,
        });
      } catch (error) {
        console.error('Failed to initialize Cesium viewer:', error);
      }
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, []); // Removed 'language' from dependencies to prevent re-initialization

  // Log to verify Cesium and viewer initialization
  useEffect(() => {
    console.log('Viewer:', viewerRef.current);
    console.log('Cesium:', window.Cesium);
  }, []);

  // Use the custom hook to manage location info, passing the current language
  const { locationInfo, loading, error } = useLocationInfo(
    viewerRef.current,
    window.Cesium, // Explicitly reference the global Cesium object
    reverseGeocode,
    language // Pass the selected language
  );

  return (
    <>
      {/* Cesium Globe Container */}
      <div
        ref={globeRef}
        id="cesiumContainer"
        style={{ height: '100vh', width: '100vw' }}
      >
        {/* Controls */}
        <div className="controls-container">
          <div className="tabs" role="tablist" aria-label="Rotation Controls">
            <button
              className={`tab-button ${isRotating ? 'active' : ''}`}
              onClick={handleRotationToggle}
              aria-selected={isRotating}
              role="tab"
              aria-controls="start-rotation-panel"
              id="start-rotation-tab"
            >
              {t("startRotation")}
            </button>
            <button
              className={`tab-button ${!isRotating ? 'active' : ''}`}
              onClick={handleRotationToggle}
              aria-selected={!isRotating}
              role="tab"
              aria-controls="stop-rotation-panel"
              id="stop-rotation-tab"
            >
              {t("stopRotation")}
            </button>
          </div>
        </div>

        {/* Location Details Panel */}
        <LocationInfoPanel
          locationInfo={locationInfo}
          loading={loading}
          error={error}
          translate={t}
        />
      </div>
    </>
  );
};

Globe.propTypes = {
  // Define prop types if necessary
};

export default Globe;
