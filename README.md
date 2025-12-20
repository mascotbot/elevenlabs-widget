# ElevenLabs Voice Widget

Embeddable voice chat widget powered by ElevenLabs conversational AI and Mascotbot SDK. Deploy once, embed anywhere with a single script tag.

![ElevenLabs Widget](https://mascotbot-app.s3.amazonaws.com/rive-assets/og_assets/preview-widget.png)

## How It Works

1. **Deploy this repo** with your ElevenLabs credentials
2. **Embed on any website** with one script tag
3. Users click the widget button to start a voice conversation

## Quick Start

### 1. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmascotbot%2Felevenlabs-widget&env=MASCOT_BOT_API_KEY,ELEVENLABS_API_KEY,ELEVENLABS_AGENT_ID&envDescription=API%20keys%20required%20for%20ElevenLabs%20widget%20integration&envLink=https%3A%2F%2Fdocs.mascot.bot%2Flibraries%2Felevenlabs-widget&project-name=elevenlabs-widget&repository-name=elevenlabs-widget)

After deploying:
1. Add the Mascotbot SDK package (`mascotbot-sdk-react-0.1.7.tgz`) to your repo
2. Add your mascot `.riv` file to the `public` folder
3. Commit and push to trigger a rebuild

### 2. Embed

Add this script tag to any website:

```html
<script src="https://your-deployed-widget.vercel.app/widget-embed.js"></script>
```

That's it! The widget appears in the bottom-right corner with click-through behavior - your page remains fully interactive.

## Embed Options

### Custom Sizes

```html
<script
  src="https://your-widget.vercel.app/widget-embed.js"
  data-widget-width="400"
  data-widget-height="500">
</script>
```

### Responsive (Mobile + Desktop)

```html
<script
  src="https://your-widget.vercel.app/widget-embed.js"
  data-widget-width="350"
  data-widget-height="450"
  data-widget-mobile-width="280"
  data-widget-mobile-height="350"
  data-widget-mobile-breakpoint="768">
</script>
```

### All Options

| Attribute | Default | Description |
|-----------|---------|-------------|
| `data-widget-url` | Auto-detected | Override the widget URL |
| `data-widget-width` | 350 | Desktop width in pixels |
| `data-widget-height` | 450 | Desktop height in pixels |
| `data-widget-mobile-width` | Same as desktop | Mobile width in pixels |
| `data-widget-mobile-height` | Same as desktop | Mobile height in pixels |
| `data-widget-mobile-breakpoint` | 768 | Viewport width to switch to mobile |

## Character Customization

Customize the mascot appearance in `src/app/page.tsx`:

```typescript
const WIDGET_CUSTOMIZATION = {
  gender: 1,              // 1 = male, 2 = female
  outline: 10,            // 0-100 stroke thickness
  colourful: true,        // true = colorful, false = monochrome
  flip: false,            // Mirror the character
  crop: false,            // Show background circle
  bg_color: 0,            // 0-10 background color (when crop=true)
  shirt_color: 2,         // 1-6 shirt color variant
  eyes_type: 2,           // 1-2 eye style
  hair_style: 1,          // 1-3 hair style
  accessories_hue: 0,     // 0-360 accessory color hue
  accessories_saturation: 0,
  accessories_brightness: 0,
};
```

## Manual Setup

### Prerequisites

- Node.js 18+
- Mascotbot SDK (`.tgz` file from subscription)
- Mascot Widget `.riv` file
- ElevenLabs API key and Agent ID

### Installation

```bash
# Clone
git clone https://github.com/mascotbot/elevenlabs-widget.git
cd elevenlabs-widget

# Add SDK
cp /path/to/mascotbot-sdk-react-0.1.7.tgz ./

# Add mascot file
cp /path/to/mascot-widget.riv ./public/

# Install
pnpm install

# Configure
cp .env.example .env.local
```

Edit `.env.local`:

```env
MASCOT_BOT_API_KEY=mascot_xxxxxxxxxxxxxx
ELEVENLABS_API_KEY=sk_xxxxxxxxxxxxxx
ELEVENLABS_AGENT_ID=agent_xxxxxxxxxxxxxx
```

Run:

```bash
pnpm dev
```

## How the Embed Works

The widget uses a click-through iframe pattern:

- **Default state**: Widget is visible but clicks pass through to your page
- **Button hover**: Only the voice chat button area is interactive
- **Active call**: Full widget becomes interactive during conversations

This means buttons, links, and other elements on your page work normally - even if they're visually "under" the widget.

## Rive File Requirements

Your widget `.riv` file needs:

**Artboard**: `Widget`

**Inputs**:
- `is_speaking` - Boolean for lip sync
- `is_connected` - Boolean for connection state
- `is_connecting` - Boolean for connecting state
- `reveal` - Trigger for initial animation
- `hit` - Trigger for call-ended animation
- `gesture` - Trigger for reactions

**Events** (emitted by Rive):
- `startCall` - User clicks start button
- `endCall` - User clicks end button

## Troubleshooting

**Widget not appearing?**
- Check browser console for errors
- Verify `.riv` file is in `/public`
- Ensure artboard is set to `Widget`

**Clicks not working?**
- Verify Rive file emits `startCall`/`endCall` events
- Check `shouldDisableRiveListeners={false}` is set

**Connection failed?**
- Verify API keys in `.env.local`
- Check ElevenLabs agent is active
- Grant microphone permissions

## Links

- [Mascotbot Documentation](https://docs.mascot.bot)
- [ElevenLabs Integration Guide](https://docs.mascot.bot/integrations/elevenlabs)
- [Support](mailto:support@mascot.bot)

---

Built with Mascotbot SDK
