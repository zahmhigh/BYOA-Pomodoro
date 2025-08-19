# 🍅 Pomodoro Timer

A beautiful, modern Pomodoro Timer that runs in your browser. Built with vanilla HTML, CSS, and JavaScript.

## Features

- ⏱️ **Three Timer Modes**: Focus (25 min), Short Break (5 min), Long Break (15 min)
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 📊 **Session Tracking**: Counts completed focus sessions and total time
- 🔔 **Notifications**: Visual and audio notifications when timer completes
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🎵 **Audio Feedback**: Built-in notification sounds using Web Audio API

## How to Use

1. **Open the Timer**: Simply open `index.html` in your web browser
2. **Choose a Mode**: Click on Focus, Short Break, or Long Break
3. **Start the Timer**: Click the "Start" button to begin
4. **Pause/Resume**: Use the "Pause" button to pause and "Start" to resume
5. **Reset**: Click "Reset" to reset the current timer
6. **Track Progress**: Watch your session count and total time increase

## Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into focused intervals, traditionally 25 minutes in length, separated by short breaks.

### Basic Workflow:
1. **Focus Session**: Work for 25 minutes without interruption
2. **Short Break**: Take a 5-minute break
3. **Repeat**: After 4 focus sessions, take a longer 15-minute break

## Browser Compatibility

This timer works in all modern browsers that support:
- ES6 Classes
- Web Audio API
- CSS Grid and Flexbox
- CSS Custom Properties

## Files Structure

```
Pomodoro/
├── index.html      # Main HTML structure
├── styles.css      # Modern CSS styling
├── script.js       # Timer functionality
└── README.md       # This file
```

## Features in Detail

### Timer Modes
- **Focus**: 25-minute work sessions
- **Short Break**: 5-minute breaks between focus sessions
- **Long Break**: 15-minute breaks after 4 focus sessions

### Session Tracking
- Automatically counts completed focus sessions
- Tracks total time spent in focus mode
- Statistics persist during the browser session

### Notifications
- Visual notifications appear when timer completes
- Audio notifications using Web Audio API
- Auto-dismissing notifications after 5 seconds

### Responsive Design
- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Touch-friendly buttons and controls

## Getting Started

1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start your first Pomodoro session!

No installation or dependencies required - it's ready to use immediately.

## Customization

You can easily customize the timer by modifying the JavaScript file:
- Change timer durations in the `switchMode` function
- Modify notification messages in the `showNotification` function
- Adjust audio settings in the `playNotificationSound` function

## License

This project is open source and available under the MIT License. 