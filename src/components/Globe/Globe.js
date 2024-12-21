/* global Cesium */
import React, { useEffect, useRef } from 'react';
import { useLang } from '../Context/LangContext'; // Import your global language context
import '../styles/Globe.css'; // Import the separate style file

const Globe = () => {
  const globeRef = useRef(null);
  const viewerRef = useRef(null);
  const animationIdRef = useRef(null);

  // Use the global language context to determine if text should be English or Korean
  const { language } = useLang();

  // Inline dictionary for multi-language support
  const text = {
    en: {
      stopRotation: "Stop Rotation",
    },
    ko: {
      stopRotation: "회전 중지",
    },
  };

  // Helper function to return the correct text based on the current language
  const t = (key) => text[language][key];

  // Manual stop rotation button
  const handleStopRotationClick = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
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

  useEffect(() => {
    // Set your Cesium Ion access token
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMWY1MGUyNC0wNjFkLTQ1YWMtYTBhNi1mYTRkMTAzNWYzOGEiLCJpZCI6MjYzODA1LCJpYXQiOjE3MzQ2Nzk0ODd9.OvjRSddy3Mt1P1rOGIFKOQQcxIqTX2i7sM1Ha4s7_qs';

    // Listen for the 'fullscreenchange' event on the document
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    // Initialize Cesium Viewer if it doesn't exist yet
    if (globeRef.current && !viewerRef.current) {
      try {
        viewerRef.current = new Cesium.Viewer(globeRef.current, {
          imageryProvider: new Cesium.IonImageryProvider({ assetId: 2 }),
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          infoBox: false,
          navigationHelpButton: false,
          sceneModePicker: false,
          timeline: false,
          animation: false,
          fullscreenButton: true,     // Enable the built-in fullscreen icon
          requestRenderMode: true,
          maximumRenderTimeChange: Infinity,
        });

        // Set initial camera view (top-down perspective)
        viewerRef.current.scene.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(
            -74.0707383,
            40.7117244,
            10000000
          ),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0.0,
          },
        });

        // Continuous rotation
        const rotateEarth = () => {
          const spinRate = 0.01;
          const delta = spinRate / 60; // 60 FPS assumption
          viewerRef.current.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -delta);
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
          }
        };

        const startRotation = () => {
          if (!animationIdRef.current) {
            rotateEarth();
          }
        };

        // Stop rotation on pointer down/wheel
        viewerRef.current.canvas.addEventListener('pointerdown', stopRotation);
        viewerRef.current.canvas.addEventListener('wheel', stopRotation, { passive: true });

        // Resume rotation on pointer up/wheel end
        viewerRef.current.canvas.addEventListener('pointerup', startRotation);
        viewerRef.current.canvas.addEventListener('wheel', startRotation, {
          passive: true,
          delay: 1000,
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
    };
  }, []);

  return (
    <>
      {/* Button to manually stop rotation */}
      <div className="stop-rotation-button-container">
        <button
          className="stop-rotation-button"
          onClick={handleStopRotationClick}
        >
          {t("stopRotation")}
        </button>
      </div>

      <div
        ref={globeRef}
        id="cesiumContainer"
        style={{ height: '100vh', width: '100vw' }}
      />
    </>
  );
};

export default Globe;
