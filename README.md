# Reels Volume Chrome Extension

![Extension Icon](icons/icon128.png)

This Chrome extension adds a convenient volume control slider to Facebook and Instagram Reels, allowing you to quickly adjust video volume without affecting the mute state.

## Features
- **Volume Slider UI**: Adds a sleek volume control to the top-right corner when viewing Reels
- **Platform Support**: Works seamlessly on both Facebook and Instagram Reels  
- **Smart Default**: Automatically sets volume to 20% for comfortable viewing
- **Visual Feedback**: Dynamic volume icons (🔇/🔉/🔊) and percentage display
- **Real-time Control**: Instantly adjusts volume for all visible Reels videos
- **Non-intrusive**: Doesn't interfere with native mute/unmute functionality
- **Dynamic Loading**: Automatically handles new videos as you scroll through Reels
- **Persistent Settings**: Maintains your volume preference across page navigation

## Installation
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the `reels-volume` folder
5. The extension will automatically activate on Facebook and Instagram

## How to Use
1. **Navigate** to Facebook or Instagram Reels
2. **Locate** the volume control slider in the top-right corner of your browser
3. **Adjust** the slider to your preferred volume level (0-100%)
4. **Watch** as the volume icon updates to reflect your setting
5. **Enjoy** consistent volume across all Reels videos

## Files
- `manifest.json`: Chrome extension manifest (v3) with icon support and permissions
- `content.js`: Main volume control logic with UI injection and video management
- `styles.css`: Styling for the volume control interface and positioning
- `icons/`: Extension icons in multiple sizes (16px, 48px, 128px)

## Technical Details
- **Volume Range**: 0-100% with precise control
- **Default Volume**: 20% for comfortable listening
- **Video Detection**: Automatically finds and controls all visible video elements
- **UI Positioning**: Fixed top-right placement with responsive design
- **Performance**: Lightweight with minimal DOM manipulation
- **Compatibility**: Works with single-page app navigation on both platforms

## Customization
- **Default Volume**: Change the initial volume by modifying the slider value in `content.js`
- **UI Position**: Adjust the positioning by editing the CSS in `styles.css`
- **Volume Icons**: Customize the emoji icons in the volume update function
- **Styling**: Modify colors, sizes, and animations in `styles.css`

## Browser Compatibility
- Chrome (Manifest V3)
- Edge, Brave, and other Chromium-based browsers

## License
MIT
