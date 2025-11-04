export interface MTAWindow extends Window {
  clientData?: (name: string, data: string) => void;
}

export type MTAEventCallback = (data: any) => void;

export type MTAEventHandler = Record<string, MTAEventCallback>;
