# MTA CEF React Config

A clean starter template for creating Multi Theft Auto: San Andreas (MTA:SA) CEF interfaces using React, TypeScript, and MobX.

## Features

- React 18 with TypeScript
- MobX for reactive state management
- Custom `useMta` hook for CEF communication
- Base64 decoding with UTF-8 support
- Ready-to-use project structure
- Example implementation

## Installation

Clone and install dependencies:

```bash
git clone https://github.com/NoTenTego/mta-cef-react-config.git
cd mta-cef-react-config
npm install
```

## Usage

### Development

```bash
npm start
```

### Build

```bash
npm run build
```

The build process automatically:
- Generates optimized production files
- Renames files to `main.js` and `main.css`
- Updates paths in `index.html` to MTA-compatible format

## Project Structure

```
src/
├── hooks/useMta.ts
├── store/AppStore.ts
├── types/mta.types.ts
├── utils/decodeBase64.ts
├── App.tsx
└── index.tsx
```

## Implementation

### Setting up MTA Event Handlers

```typescript
import { useMta } from './hooks/useMta';
import { appStore } from './store/AppStore';

const App = observer(() => {
  useMta({
    setVisible: (visible: boolean) => appStore.setVisible(visible),
    updatePlayerData: (data: any) => appStore.setPlayerData(data),
  });
});
```

### Sending Data from MTA Client (Lua)

```lua
function sendToCEF(eventName, data)
    local jsonData = toJSON(data)
    local encodedData = base64Encode(jsonData)

    executeBrowserJavascript(browser,
        string.format("clientData('%s', '%s')", eventName, encodedData)
    )
end

sendToCEF('setVisible', true)

sendToCEF('updatePlayerData', {
    name = "Player Name",
    health = 100,
    money = 5000
})
```

### Managing State with MobX

```typescript
class AppStore {
  isVisible: boolean = false;
  playerName: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setVisible(visible: boolean) {
    this.isVisible = visible;
  }

  handleMTAData(eventName: string, data: any) {
    switch (eventName) {
      case 'setVisible':
        this.setVisible(data);
        break;
    }
  }
}
```

### Using Observer Pattern

```typescript
import { observer } from 'mobx-react-lite';

const PlayerInfo = observer(() => {
  return (
    <div>
      <p>Name: {appStore.playerName}</p>
    </div>
  );
});
```

## Example Lua Script

```lua
local browser

function createBrowser()
    browser = createBrowser(800, 600, false, false)
    loadBrowserURL(browser, "http://mta/local/cef/index.html")
    showCursor(true)

    addEventHandler("onClientBrowserCreated", browser, function()
        sendToCEF('setVisible', true)
    end)
end

function sendToCEF(eventName, data)
    if not browser then return end

    local jsonData = toJSON(data)
    local encodedData = base64Encode(jsonData)

    executeBrowserJavascript(browser,
        string.format("clientData('%s', '%s')", eventName, encodedData)
    )
end

addCommandHandler("showui", function()
    if not browser then
        createBrowser()
    else
        sendToCEF('setVisible', true)
    end
end)
```

## Configuration

TypeScript settings can be modified in `tsconfig.json`.

For custom webpack configuration, eject the project:

```bash
npm run eject
```

## Links

- [MTA:SA Official Website](https://multitheftauto.com/)
- [MTA:SA Wiki - CEF](https://wiki.multitheftauto.com/wiki/Category:MTA_CEF_functions)
- [React Documentation](https://react.dev/)
- [MobX Documentation](https://mobx.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

MIT License
