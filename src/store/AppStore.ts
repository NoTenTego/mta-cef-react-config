import { makeAutoObservable } from 'mobx';

/**
 * Main application store using MobX for state management
 * This store handles communication with MTA:SA client
 */
class AppStore {
  // Example: Store UI visibility state
  isVisible: boolean = false;

  // Example: Store data received from MTA
  playerData: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set UI visibility
   */
  setVisible(visible: boolean) {
    this.isVisible = visible;
  }

  /**
   * Update player data received from MTA
   */
  setPlayerData(data: any) {
    this.playerData = data;
  }

  /**
   * Handle data received from MTA client
   * This method will be called by the useMta hook
   */
  handleMTAData(eventName: string, data: any) {
    switch (eventName) {
      case 'setVisible':
        this.setVisible(data);
        break;
      case 'updatePlayerData':
        this.setPlayerData(data);
        break;
      default:
        console.warn(`Unknown MTA event: ${eventName}`);
    }
  }
}

export const appStore = new AppStore();
