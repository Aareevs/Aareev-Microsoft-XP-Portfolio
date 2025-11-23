<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AareevSrin XP – Portfolio

Windows XP–inspired portfolio desktop with draggable windows, start menu, taskbar, and a built‑in Music Player. Designed to showcase projects and design craft with playful nostalgia.

## Features

- Start Menu with apps: About Me, Resume, Projects, Contact, Gemini
- Window manager with focus, minimize, maximize, and taskbar interaction
- Music Player with playlist, play/pause, next/prev, volume, and local MP3 assets
- Continuous playback when minimized
- Custom wallpaper, cursor, and XP‑style UI details

## Tech Stack

- Vite + React + TypeScript
- Framer Motion for window animations
- Lucide icons for UI controls

## Local Development

Prerequisites: Node.js

1. Install dependencies: `npm install`
2. Optional: set `GEMINI_API_KEY` in [.env.local](.env.local)
3. Start dev server: `npm run dev`
4. Open `http://localhost:3000` (or the prompted port)

## Music Assets

Add MP3 files under `Music Assets/` and register them in `constants.ts` using:

```
const TrackUrl = new URL('./Music Assets/Your_Song.mp3', import.meta.url).href;
```

Then append to `MUSIC_TRACKS` with `type: 'file'` and your metadata.

## Favicon & Artwork

- Favicon sourced from a multicolored Windows logo
- Album art uses reliable external sources; swap to local files if needed

## Deployment

1. Build: `npm run build`
2. Preview: `npm run preview`
3. Deploy `dist/` to your static host (Vercel, Netlify, GH Pages)
