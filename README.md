# Edit Chain Master

Edit Chain Master is a mobile-first portrait Phaser 3 game built for GitHub Pages.

## Core loop
- Watch a glowing tile pattern preview
- The preview disappears
- Drag across the tiles in the correct order
- Earn score from speed, accuracy, and combo
- Survive harder rounds with evolving pressure

## Features
- Portrait phone-first design
- Large touch targets
- Finger-drag tile tracing
- Animated start menu
- Round summaries
- Session results
- Local storage stats
- Progressive difficulty

## Local run
Because this project uses ES modules, run it from a local server.

Examples:
- VS Code Live Server
- `python -m http.server`
- Vite or similar static server

## Deploy to GitHub Pages
1. Push the repo to GitHub
2. Go to Settings > Pages
3. Set deployment to the main branch root
4. Save

## Folder structure
- `index.html`
- `style.css`
- `main.js`
- `assets/`
- `scenes/`
- `systems/`
- `ui/`

## Notes
This first pass uses generated shapes and text rather than image assets so it is easy to run immediately. You can later replace generated visuals with polished assets and sound files.
