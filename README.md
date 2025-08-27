# Reels Volume Chrome Extension

This Chrome extension allows you to control the volume of Reels videos on Facebook and Instagram with a convenient slider UI.

## Features
- Adds a volume slider to the top-right corner of the browser window when viewing Reels.
- Works on both Facebook and Instagram Reels.
- Default volume is set to 20% (can be adjusted).
- Does not change the mute state of videos—only the volume.
- Updates the volume for all visible Reels videos in real time.
- Handles dynamically loaded videos and single-page app navigation.

## Installation
1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the `reels-volume` folder.

## Files
- `manifest.json`: Chrome extension manifest (v3).
- `content.js`: Main script for volume control UI and logic.
- `styles.css`: Styles for the volume control UI.

## How It Works
- The extension injects a volume slider UI when you view Reels on Facebook or Instagram.
- Adjusting the slider changes the volume of all visible Reels videos.
- The UI updates to show the current volume percentage and icon.
- MutationObserver ensures new videos also get the correct volume setting.

## Customization
- You can change the default volume or UI styles by editing `content.js` and `styles.css`.

## License
MIT
