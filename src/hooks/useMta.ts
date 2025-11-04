import { useEffect } from 'react';
import { MTAWindow, MTAEventHandler } from '../types/mta.types';
import { decodeBase64 } from '../utils/decodeBase64';

/**
 * Custom hook for handling MTA:SA CEF communication
 *
 * @param eventHandlers - Object with event names as keys and handler functions as values
 *
 * @example
 * useMta({
 *   'showUI': (data) => console.log('Show UI:', data),
 *   'updateData': (data) => store.updateData(data)
 * });
 */
export const useMta = (eventHandlers: MTAEventHandler) => {
  useEffect(() => {
    const mtaWindow = window as MTAWindow;

    // Setup global handler for MTA events
    mtaWindow.clientData = (eventName: string, encodedData: string) => {
      try {
        // Decode base64 data (supports Polish characters)
        const decodedData = decodeBase64(encodedData);

        // Parse JSON data
        const data = JSON.parse(decodedData);

        // Call appropriate event handler
        if (eventHandlers[eventName]) {
          eventHandlers[eventName](data);
        } else {
          console.warn(`No handler found for MTA event: ${eventName}`);
        }
      } catch (error) {
        console.error('Error processing MTA data:', error);
        console.error('Event:', eventName, 'Data:', encodedData);
      }
    };

    // Cleanup on unmount
    return () => {
      mtaWindow.clientData = undefined;
    };
  }, [eventHandlers]);
};
