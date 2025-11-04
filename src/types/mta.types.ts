/**
 * Global MTA interface types
 */
export interface MTAWindow extends Window {
  clientData?: (name: string, data: string) => void;
}

/**
 * MTA Event callback type
 */
export type MTAEventCallback = (data: any) => void;

/**
 * MTA Event handler type
 */
export type MTAEventHandler = Record<string, MTAEventCallback>;
