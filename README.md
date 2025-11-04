# MTA CEF React Config

A clean and modern starter template for creating **Multi Theft Auto: San Andreas (MTA:SA)** CEF interfaces using **React**, **TypeScript**, and **MobX**.

## 🚀 Features

- ✅ **React 18** with TypeScript
- ✅ **MobX** for reactive state management
- ✅ **Custom `useMta` hook** for easy CEF communication
- ✅ **Base64 decoding** with UTF-8 support (Polish characters)
- ✅ **Ready-to-use project structure**
- ✅ **Example implementation** with best practices

## 📦 Installation

1. Clone this repository:
```bash
git clone https://github.com/NoTenTego/mta-cef-react-config.git
cd mta-cef-react-config
```

2. Install dependencies:
```bash
npm install
```

## 🛠️ Usage

### Development

Start the development server:
```bash
npm start
```

### Build for MTA

Build the project for MTA:SA:
```bash
npm run build
```

The build will automatically:
- Generate optimized production files
- Rename files to `main.js` and `main.css`
- Update paths in `index.html` to MTA-compatible format
- Place files in the correct directory structure

## 📁 Project Structure

```
src/
├── hooks/
│   └── useMta.ts          # Custom hook for MTA CEF communication
├── store/
│   └── AppStore.ts        # MobX store for state management
├── types/
│   └── mta.types.ts       # TypeScript type definitions
├── utils/
│   └── decodeBase64.ts    # Base64 decoder with UTF-8 support
├── App.tsx                # Main application component
├── App.css                # Application styles
├── index.tsx              # Entry point
└── index.css              # Global styles
```

## 💡 How to Use

### 1. Setting up MTA Event Handlers

In your `App.tsx`, use the `useMta` hook to handle events from MTA client:

```typescript
import { useMta } from './hooks/useMta';
import { appStore } from './store/AppStore';

const App = observer(() => {
  useMta({
    // Event handler for showing/hiding UI
    setVisible: (visible: boolean) => appStore.setVisible(visible),

    // Event handler for receiving player data
    updatePlayerData: (data: any) => appStore.setPlayerData(data),

    // Add your custom event handlers here
    customEvent: (data: any) => console.log('Custom event:', data),
  });

  // Your component code...
});
```

### 2. Sending Data from MTA Client (Lua)

From your MTA Lua script, send data to CEF using base64 encoding:

```lua
-- Function to encode data and send to CEF
function sendToCEF(eventName, data)
    local jsonData = toJSON(data)
    local encodedData = base64Encode(jsonData)

    -- Call the clientData function in CEF
    executeBrowserJavascript(browser,
        string.format("clientData('%s', '%s')", eventName, encodedData)
    )
end

-- Example: Show UI
sendToCEF('setVisible', true)

-- Example: Send player data
sendToCEF('updatePlayerData', {
    name = "Player Name",
    health = 100,
    money = 5000
})
```

### 3. Managing State with MobX

Edit `src/store/AppStore.ts` to add your application state:

```typescript
class AppStore {
  isVisible: boolean = false;
  playerName: string = '';
  playerHealth: number = 100;

  constructor() {
    makeAutoObservable(this);
  }

  setVisible(visible: boolean) {
    this.isVisible = visible;
  }

  updatePlayer(name: string, health: number) {
    this.playerName = name;
    this.playerHealth = health;
  }

  handleMTAData(eventName: string, data: any) {
    switch (eventName) {
      case 'setVisible':
        this.setVisible(data);
        break;
      case 'updatePlayer':
        this.updatePlayer(data.name, data.health);
        break;
      // Add more cases for your events
    }
  }
}
```

### 4. Using Observer Pattern

Wrap your components with `observer` to make them reactive:

```typescript
import { observer } from 'mobx-react-lite';
import { appStore } from './store/AppStore';

const PlayerInfo = observer(() => {
  return (
    <div>
      <p>Name: {appStore.playerName}</p>
      <p>Health: {appStore.playerHealth}</p>
    </div>
  );
});
```

## 🔧 Configuration

### Webpack Configuration

The project uses Create React App's built-in webpack configuration. For custom webpack settings, you can eject the project:

```bash
npm run eject
```

⚠️ **Warning:** This is a one-way operation!

### TypeScript Configuration

TypeScript settings can be modified in `tsconfig.json`.

## 📝 Example Lua Script

Here's a complete example of creating a CEF browser in MTA:

```lua
local browser

-- Create browser
function createBrowser()
    browser = createBrowser(800, 600, false, false)

    -- Load your CEF interface
    loadBrowserURL(browser, "http://mta/local/cef/index.html")

    -- Show cursor
    showCursor(true)

    -- Add event handler
    addEventHandler("onClientBrowserCreated", browser, function()
        -- Browser is ready, you can now send data
        sendToCEF('setVisible', true)
    end)
end

-- Function to send data to CEF
function sendToCEF(eventName, data)
    if not browser then return end

    local jsonData = toJSON(data)
    local encodedData = base64Encode(jsonData)

    executeBrowserJavascript(browser,
        string.format("clientData('%s', '%s')", eventName, encodedData)
    )
end

-- Example usage
addCommandHandler("showui", function()
    if not browser then
        createBrowser()
    else
        sendToCEF('setVisible', true)
    end
end)

addCommandHandler("hideui", function()
    sendToCEF('setVisible', false)
end)
```

## 🎨 Styling

The template uses vanilla CSS for styling. You can easily integrate:
- **CSS Modules**
- **Styled Components**
- **Tailwind CSS**
- **Sass/SCSS**

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Useful Links

- [MTA:SA Official Website](https://multitheftauto.com/)
- [MTA:SA Wiki - CEF](https://wiki.multitheftauto.com/wiki/Category:MTA_CEF_functions)
- [React Documentation](https://react.dev/)
- [MobX Documentation](https://mobx.js.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## ❓ FAQ

### Q: Why is the UI not showing?

A: Make sure you're sending the `setVisible` event from your MTA Lua script with `true` value.

### Q: How do I add more event handlers?

A: Simply add new handlers to the object passed to `useMta()` hook in your `App.tsx`.

### Q: Can I use this with class components?

A: Yes, but we recommend using functional components with hooks for better compatibility with MobX and modern React patterns.

### Q: How do I debug CEF?

A: Enable CEF debugging in MTA by running the game with `--enable-remote-debugging` flag, then navigate to `http://localhost:9222` in Chrome.

---

Made with ❤️ for MTA:SA community
