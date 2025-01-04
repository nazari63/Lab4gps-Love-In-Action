// src/components/BlinkingBeacon.js

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * BlinkingBeacon Component
 * 
 * Props:
 * - viewer: Cesium Viewer instance
 * - beacons: Array of beacon objects
 *    Each beacon object should have:
 *      - id: unique identifier
 *      - longitude: number
 *      - latitude: number
 *      - stage: number (1 to 35)
 */
const BlinkingBeacon = ({ viewer, beacons }) => {
  // Define the 35 color sets (7 colors with 5 shades each)
  const colorSets = [
    // Red shades
    { stage: 1, color: [255, 0, 0] },      // Red
    { stage: 2, color: [255, 51, 51] },   // Light Red
    { stage: 3, color: [255, 102, 102] }, // Lighter Red
    { stage: 4, color: [255, 153, 153] }, // Even Lighter Red
    { stage: 5, color: [255, 204, 204] }, // Soft Red

    // Orange shades
    { stage: 6, color: [255, 165, 0] },    // Orange
    { stage: 7, color: [255, 180, 51] },   // Light Orange
    { stage: 8, color: [255, 195, 102] },  // Lighter Orange
    { stage: 9, color: [255, 210, 153] },  // Even Lighter Orange
    { stage: 10, color: [255, 225, 204] }, // Soft Orange

    // Yellow shades
    { stage: 11, color: [255, 255, 0] },    // Yellow
    { stage: 12, color: [255, 255, 51] },   // Light Yellow
    { stage: 13, color: [255, 255, 102] },  // Lighter Yellow
    { stage: 14, color: [255, 255, 153] },  // Even Lighter Yellow
    { stage: 15, color: [255, 255, 204] },  // Soft Yellow

    // Green shades
    { stage: 16, color: [0, 128, 0] },      // Green
    { stage: 17, color: [51, 153, 51] },    // Light Green
    { stage: 18, color: [102, 178, 102] },  // Lighter Green
    { stage: 19, color: [153, 204, 153] },  // Even Lighter Green
    { stage: 20, color: [204, 229, 204] },  // Soft Green

    // Blue shades
    { stage: 21, color: [0, 0, 255] },      // Blue
    { stage: 22, color: [51, 51, 255] },    // Light Blue
    { stage: 23, color: [102, 102, 255] },  // Lighter Blue
    { stage: 24, color: [153, 153, 255] },  // Even Lighter Blue
    { stage: 25, color: [204, 204, 255] },  // Soft Blue

    // Indigo shades
    { stage: 26, color: [75, 0, 130] },     // Indigo
    { stage: 27, color: [102, 51, 153] },   // Light Indigo
    { stage: 28, color: [128, 102, 178] },  // Lighter Indigo
    { stage: 29, color: [153, 153, 204] },  // Even Lighter Indigo
    { stage: 30, color: [178, 178, 229] },  // Soft Indigo

    // Violet shades
    { stage: 31, color: [238, 130, 238] },  // Violet
    { stage: 32, color: [221, 160, 221] },  // Light Violet
    { stage: 33, color: [204, 153, 204] },  // Lighter Violet
    { stage: 34, color: [187, 170, 187] },  // Even Lighter Violet
    { stage: 35, color: [170, 187, 170] },  // Soft Violet
  ];

  /**
   * Converts an RGB array to a Cesium Color with the specified alpha.
   * @param {Array} rgbArray - Array containing RGB values [R, G, B].
   * @param {number} alpha - Opacity value between 0.0 (transparent) and 1.0 (opaque).
   * @returns {Cesium.Color} - Cesium Color object.
   */
  const getCesiumColor = (rgbArray, alpha = 1.0) => {
    return window.Cesium.Color.fromBytes(rgbArray[0], rgbArray[1], rgbArray[2], Math.round(alpha * 255));
  };

  /**
   * Retrieves the Cesium Color corresponding to the given stage.
   * @param {number} stage - The stage of problem-solving (1 to 35).
   * @returns {Cesium.Color} - Cesium Color object.
   */
  const getColorByStage = (stage) => {
    const colorSet = colorSets.find((c) => c.stage === stage);
    if (colorSet) {
      return getCesiumColor(colorSet.color, 1.0); // Full opacity
    }
    // Default color if stage not found
    return window.Cesium.Color.WHITE;
  };

  useEffect(() => {
    if (!viewer) {
      console.error('Cesium Viewer instance is required for BlinkingBeacon.');
      return;
    }

    // Keep track of created entities to manage updates and removals
    const beaconEntities = {};

    /**
     * Creates a beacon entity in Cesium Viewer.
     * @param {Object} beacon - Beacon object containing id, longitude, latitude, and stage.
     */
    const createBeacon = (beacon) => {
      const { id, longitude, latitude, stage } = beacon;

      // Define the color based on the stage
      const color = getColorByStage(stage);

      // Create a billboard entity with blinking effect
      const entity = viewer.entities.add({
        id: `beacon-${id}`,
        position: window.Cesium.Cartesian3.fromDegrees(longitude, latitude, 100000), // Adjust height as needed
        billboard: {
          image: '/assets/pulsing-beacon.svg', // Ensure this image exists in public/assets/
          color: color,
          scale: 2.0, // Increased scale for larger size
          verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
          disableDepthTestDistance: Number.POSITIVE_INFINITY, // Ensure visibility
        },
        // Optional: Add a point for better visibility
        point: {
          pixelSize: 14, // Increased pixel size for larger points
          color: color,
          outlineColor: window.Cesium.Color.WHITE,
          outlineWidth: 3, // Thicker outline
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        // Optional: Add label
        label: {
          text: `Stage ${stage}`,
          font: '16pt sans-serif', // Increased font size for better readability
          style: window.Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new window.Cesium.Cartesian2(0, -30), // Adjusted offset for better placement
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          show: false, // Set to true if you want labels to be visible
        },
      });

      // Store the entity reference
      beaconEntities[id] = entity;
    };

    /**
     * Updates the beacon's color and label based on the new stage.
     * @param {Object} beacon - Beacon object containing id and updated stage.
     */
    const updateBeacon = (beacon) => {
      const { id, stage } = beacon;
      const entity = beaconEntities[id];

      if (entity) {
        const newColor = getColorByStage(stage);
        if (entity.billboard) {
          entity.billboard.color = newColor;
        }
        if (entity.point) {
          entity.point.color = newColor;
        }
        if (entity.label) {
          entity.label.text = `Stage ${stage}`;
        }
      }
    };

    /**
     * Removes a beacon entity from Cesium Viewer.
     * @param {string} id - Unique identifier of the beacon to remove.
     */
    const removeBeacon = (id) => {
      const entity = beaconEntities[id];
      if (entity) {
        viewer.entities.remove(entity);
        delete beaconEntities[id];
      }
    };

    // Initialize beacons
    beacons.forEach((beacon) => {
      if (beacon.stage > 0 && beacon.stage <= 35) {
        createBeacon(beacon);
      }
    });

    // Blinking effect using Cesium's clock
    const blinkingRate = 500; // Reduced blinking rate for more aggressive blinking (milliseconds)
    const originalColors = {};

    // Store original colors
    beacons.forEach((beacon) => {
      originalColors[beacon.id] = getColorByStage(beacon.stage);
    });

    /**
     * Toggles the opacity of beacons to create a blinking effect.
     */
    const toggleBlink = () => {
      beacons.forEach((beacon) => {
        const entity = beaconEntities[beacon.id];
        if (entity && entity.billboard && entity.point) {
          // Get current color
          const currentColor = entity.billboard.color.getValue(viewer.clock.currentTime);

          // Toggle between full opacity and high transparency
          if (currentColor.alpha === 255) { // Full opacity
            entity.billboard.color = window.Cesium.Color.fromBytes(
              Math.round(currentColor.red * 255),
              Math.round(currentColor.green * 255),
              Math.round(currentColor.blue * 255),
              128 // High transparency
            );
            entity.point.color = window.Cesium.Color.fromBytes(
              Math.round(currentColor.red * 255),
              Math.round(currentColor.green * 255),
              Math.round(currentColor.blue * 255),
              128 // High transparency
            );
          } else { // Semi-transparent
            entity.billboard.color = originalColors[beacon.id];
            entity.point.color = originalColors[beacon.id];
          }
        }
      });
    };

    // Start blinking interval
    const intervalId = setInterval(toggleBlink, blinkingRate);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      beacons.forEach((beacon) => {
        removeBeacon(beacon.id);
      });
    };
  }, [viewer, beacons]);

  return null; // This component does not render anything directly
};

BlinkingBeacon.propTypes = {
  viewer: PropTypes.object.isRequired, // Cesium Viewer instance
  beacons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,      // Unique identifier
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      stage: PropTypes.number.isRequired,   // 1 to 35
    })
  ).isRequired,
};

export default BlinkingBeacon;
