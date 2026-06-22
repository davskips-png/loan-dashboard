# Digital Clock - Multiple Time Zones

A real-time digital clock application displaying the current time across different time zones with a modern, responsive UI.

## Features

- 🕐 Real-time clock updates every second
- 🌍 Multiple time zone support (12+ major cities)
- 🎨 Modern dark/light theme
- 📱 Fully responsive design
- ⏰ 12/24 hour format toggle
- 🌡️ Temperature display per location (optional)
- 🎯 Easy-to-read digital display
- ✨ Smooth animations

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Time Handling:** Day.js
- **State Management:** React Hooks
- **Icons:** Lucide React

## Project Structure

```
digital-clock/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Clock.jsx
│   │   │   ├── TimeZoneCard.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── hooks/
│   │   │   └── useCurrentTime.js
│   │   ├── data/
│   │   │   └── timezones.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

Access at: http://localhost:5173

## Supported Time Zones

- New York (EST/EDT)
- London (GMT/BST)
- Paris (CET/CEST)
- Tokyo (JST)
- Sydney (AEDT/AEST)
- Dubai (GST)
- Hong Kong (HKT)
- Singapore (SGT)
- Los Angeles (PST/PDT)
- Chicago (CST/CDT)
- Mumbai (IST)
- Moscow (MSK)

## Features Breakdown

### Real-Time Updates
Updates every second to show current time

### Theme Toggle
Switch between dark and light modes

### Format Toggle
Switch between 12-hour and 24-hour formats

### Responsive Design
Works seamlessly on mobile, tablet, and desktop

## License

MIT