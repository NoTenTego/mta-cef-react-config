import { useEffect } from 'react';
import { MTAWindow, MTAEventHandler } from '../types/mta.types';
import { decodeBase64 } from '../utils/decodeBase64';

export const useMta = (eventHandlers: MTAEventHandler) => {
  useEffect(() => {
    const mtaWindow = window as MTAWindow;

    mtaWindow.clientData = (eventName: string, encodedData: string) => {
      try {
        const decodedData = decodeBase64(encodedData);
        const data = JSON.parse(decodedData);

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

    return () => {
      mtaWindow.clientData = undefined;
    };
  }, [eventHandlers]);
};
