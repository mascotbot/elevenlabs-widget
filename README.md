# ElevenLabs Widget Integration Demo

Complete open-source example for integrating embeddable animated widget avatars with ElevenLabs conversational AI using Mascotbot SDK. Features transparent background, Rive-controlled interactions, and real-time lip sync.

![ElevenLabs Widget Integration Demo](https://mascotbot-app.s3.amazonaws.com/rive-assets/og_assets/preview-widget.png)

## 🎯 Widget vs Avatar

This is the **widget** version of the ElevenLabs integration, designed for embedding in other applications:

| Feature | Widget (this repo) | [Avatar](https://github.com/mascotbot/elevenlabs-avatar) |
|---------|-------------------|-----------------------------------------------------------|
| Background | Transparent (embeddable) | Full-page with background |
| Controls | Rive-controlled (in-animation buttons) | HTML buttons |
| Position | Bottom-right corner | Centered |
| Use Case | Embed in existing apps/websites | Standalone demo page |

## 🚀 Quick Start

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmascotbot%2Felevenlabs-widget&env=MASCOT_BOT_API_KEY,ELEVENLABS_API_KEY,ELEVENLABS_AGENT_ID&envDescription=API%20keys%20required%20for%20ElevenLabs%20widget%20integration&envLink=https%3A%2F%2Fdocs.mascot.bot%2Flibraries%2Felevenlabs-widget&project-name=elevenlabs-widget-demo&repository-name=elevenlabs-widget-demo)

**After deploying with Vercel:**
1. Add the Mascotbot SDK package (`mascotbot-sdk-react-0.1.7.tgz`) to your cloned repository
2. Add your mascot widget `.riv` file to the `public` folder (widget files have `_widget` suffix)
3. Commit and push these changes to trigger a rebuild

### Prerequisites

- Node.js 18+
- Mascotbot SDK (provided as `.tgz` file after subscription)
- Mascot Widget `.riv` file (widget version with `_widget` suffix, provided with SDK subscription)
- ElevenLabs API key and Agent ID
- Mascotbot API key

### Manual Installation

1. Clone this repository:
```bash
git clone https://github.com/mascotbot/elevenlabs-widget.git
cd elevenlabs-widget
```

2. Copy the Mascotbot SDK package to the project root:
```bash
cp /path/to/mascotbot-sdk-react-0.1.7.tgz ./
```

3. Copy your mascot widget .riv file to the public folder:
```bash
cp /path/to/mascot_widget.riv ./public/
```

4. Install dependencies:
```bash
npm install
# or
pnpm install
```

5. Set up environment variables:
```bash
cp .env.example .env.local
```

6. Update `.env.local` with your credentials:
```env
MASCOT_BOT_API_KEY=your_mascot_bot_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id
```

7. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the widget in action!

## 🎯 What This Demo Shows

This example demonstrates:

- **Transparent Background**: Widget designed to be overlaid on any content
- **Rive-Controlled Interactions**: Start/end calls via animated buttons in the Rive file
- **Real-time Lip Sync**: Perfect viseme synchronization with ElevenLabs audio streams
- **WebSocket Integration**: Automatic data extraction from ElevenLabs connections
- **Natural Mouth Movements**: Human-like lip sync processing
- **Dynamic Variables**: Pass custom data to your ElevenLabs agent
- **Production-Ready Components**: Complete implementation ready for embedding

## 📁 Project Structure

```
elevenlabs-widget/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main widget page with transparent background
│   │   ├── layout.tsx        # Root layout with transparency support
│   │   ├── globals.css       # Styles ensuring full transparency
│   │   └── api/
│   │       └── get-signed-url/
│   │           └── route.ts  # API endpoint for ElevenLabs authentication
│   └── components/           # Additional components (if needed)
├── public/                   # Static assets (place mascot_widget.riv here)
├── .env.example             # Environment variables template
├── package.json             # Project dependencies
└── README.md               # This file
```

## 🔧 Key Features

### 1. Transparent Background

The widget is designed with full transparency, allowing it to be embedded over any content:

```css
/* Automatic transparency applied to all elements */
html, body, div, main {
  background: transparent !important;
}
```

### 2. Rive-Controlled Interactions

Unlike the avatar version with HTML buttons, the widget responds to events from the Rive animation:

```typescript
// Listen for Rive events
rive.on(EventType.RiveEvent, (riveEvent) => {
  if (eventName === "startCall") {
    startConversation();
  } else if (eventName === "endCall") {
    stopConversation();
  }
});
```

Your widget Rive file should emit these events:
- `startCall` - When user clicks the call button in the animation
- `endCall` - When user clicks the end button in the animation

### 3. Widget-Specific Rive Inputs

The widget uses additional Rive inputs for state management:

```typescript
inputs={[
  "gesture",        // Trigger for animated reactions
  "is_speaking",    // Boolean for lip sync
  "is_connected",   // Boolean for connection state
  "is_connecting",  // Boolean for connecting state
  "reveal",         // Trigger for initial reveal animation
  "hit",            // Trigger for agent-ended-call animation
  "character",      // Optional: character selection
  "glasses",        // Optional: accessory toggles
  "suit-skin",      // Optional: customization
  "hair-skin",      // Optional: customization
]}
```

### 4. Dynamic Variables

Pass custom data to your ElevenLabs agent:

```typescript
const dynamicVariables = {
  name: "User",
  company: "Acme Corp",
  // Add variables matching your agent's configuration
};

// Variables are passed both at session start and URL generation
await conversation.startSession({
  signedUrl,
  dynamicVariables: dynamicVariables,
});
```

### 5. Natural Lip Sync Processing

```typescript
// Human-like mouth movements with configurable parameters
const [lipSyncConfig] = useState({
  minVisemeInterval: 40,
  mergeWindow: 60,
  keyVisemePreference: 0.6,
  preserveSilence: true,
  similarityThreshold: 0.4,
  preserveCriticalVisemes: true,
  criticalVisemeMinDuration: 80,
});

useMascotElevenlabs({
  conversation,
  naturalLipSync: true,
  naturalLipSyncConfig: lipSyncConfig,
});
```

### 6. Pre-fetched URLs for Instant Connection

The widget pre-fetches signed URLs and refreshes them every 9 minutes, ensuring instant connection when users interact with the widget.

## 🛠️ Customization

### Using Your Own Widget Avatar

The widget expects a mascot widget .riv file in the public folder. Widget files typically have a `_widget` suffix:

```typescript
const mascotUrl = "/mascot_widget.riv"; // Widget version of your mascot
```

You can also use a CDN URL:
```typescript
const mascotUrl = "https://your-cdn.com/your-mascot_widget.riv";
```

### Widget Rive File Requirements

Your widget Rive file should have:

**Artboard**: `Widget` (not `Character`)

**Inputs**:
- `is_speaking` - Boolean input for lip sync
- `is_connected` - Boolean for connection state
- `is_connecting` - Boolean for connecting state
- `reveal` - Trigger for initial reveal animation
- `hit` - Trigger for agent-ended-call reaction
- `gesture` - Optional trigger for animated reactions

**Events**:
- `startCall` - Emitted when user clicks start button
- `endCall` - Emitted when user clicks end button

### Adjusting Position and Size

```typescript
// Modify the WidgetWrapper component
<div
  className="fixed bottom-0 right-0"
  style={{
    width: "100vh",    // Adjust size
    height: "100vh",   // Adjust size
    backgroundColor: "transparent",
  }}
>
```

### Changing Alignment

```typescript
layout={{
  fit: Fit.Contain,
  alignment: Alignment.BottomRight, // Or BottomLeft, Center, etc.
}}
```

## 📝 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Mascotbot API Key (get from app.mascot.bot)
MASCOT_BOT_API_KEY=mascot_xxxxxxxxxxxxxx

# ElevenLabs Credentials
ELEVENLABS_API_KEY=sk_xxxxxxxxxxxxxx
ELEVENLABS_AGENT_ID=agent_xxxxxxxxxxxxxx
```

## 🚨 Important Notes

### Widget vs Avatar Rive Files

Widget Rive files are different from avatar Rive files:
- Widget files have `_widget` suffix (e.g., `mascot_widget.riv`)
- Widget files use the `Widget` artboard
- Widget files have embedded UI controls (buttons in the animation)
- Widget files emit Rive events for interaction

### WebSocket Proxy Requirement

**Do NOT connect directly to ElevenLabs WebSocket URLs**. The avatar lip-sync requires viseme data that only the Mascotbot proxy provides.

### Browser Requirements

- Modern browser with WebGL2 support
- Microphone access for voice interaction
- Stable internet connection for WebSocket streaming

### Embedding the Widget

The widget can be embedded in an iframe or directly in your application:

```html
<!-- Iframe embedding -->
<iframe
  src="https://your-widget-url.com"
  style="
    position: fixed;
    bottom: 0;
    right: 0;
    width: 400px;
    height: 400px;
    border: none;
    background: transparent;
    pointer-events: none;
  "
  allow="microphone"
></iframe>
```

## 🐛 Troubleshooting

### Widget Not Appearing?

1. Check if using the widget Rive file (with `_widget` suffix)
2. Verify the artboard is set to `Widget`
3. Check browser console for loading errors

### Buttons Not Working?

1. Ensure your Rive file emits `startCall` and `endCall` events
2. Check console for "Rive event received" logs
3. Verify `shouldDisableRiveListeners={false}` is set

### Background Not Transparent?

1. Check that globals.css is being imported
2. Verify no parent container is adding a background
3. When embedding in iframe, ensure iframe has `background: transparent`

### Connection Failed?

1. Verify your API keys are correct
2. Check that your ElevenLabs agent is active
3. Ensure microphone permissions are granted
4. Look for errors in the browser console

## 📚 Documentation

For complete documentation on the Mascotbot SDK and all available features, visit:
- [Mascotbot Documentation](https://docs.mascot.bot)
- [ElevenLabs Integration Guide](https://docs.mascot.bot/integrations/elevenlabs)
- [Widget-Specific Guide](https://docs.mascot.bot/integrations/elevenlabs-widget)

## 📄 License

This demo is provided as an open-source example for Mascotbot subscribers. You're free to use, modify, and deploy it as needed for your projects.

## 🤝 Support

- For SDK issues: support@mascot.bot
- For ElevenLabs issues: [ElevenLabs Support](https://elevenlabs.io/support)
- Community: [Discord Server](https://discord.gg/SBxfyPXD)

---

Built with ❤️ by the Mascotbot team
