import { makeAutoObservable } from 'mobx';

class AppStore {
  isVisible: boolean = false;
  playerData: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  setVisible(visible: boolean) {
    this.isVisible = visible;
  }

  setPlayerData(data: any) {
    this.playerData = data;
  }

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
