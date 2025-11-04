import React from 'react';
import { observer } from 'mobx-react-lite';
import { useMta } from './hooks/useMta';
import { appStore } from './store/AppStore';
import './App.css';

/**
 * Main App component with MTA CEF integration
 * Uses MobX for state management and observer pattern
 */
const App: React.FC = observer(() => {
  // Setup MTA event handlers
  useMta({
    setVisible: (visible: boolean) => appStore.setVisible(visible),
    updatePlayerData: (data: any) => appStore.setPlayerData(data),
    // Add more event handlers here as needed
  });

  // Don't render if UI is not visible
  if (!appStore.isVisible) {
    return null;
  }

  return (
    <div className="app">
      <h1>MTA CEF React Template</h1>

      {appStore.playerData && (
        <div className="player-data">
          <h2>Player Data:</h2>
          <pre>{JSON.stringify(appStore.playerData, null, 2)}</pre>
        </div>
      )}

      <div className="example-content">
        <p>This is a starter template for MTA:SA CEF with React + TypeScript + MobX</p>
        <button onClick={() => console.log('Button clicked!')}>
          Example Button
        </button>
      </div>
    </div>
  );
});

export default App;
