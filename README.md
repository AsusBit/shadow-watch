# Shadow Watch - CityX Crime Reporting System

A modern web application for reporting and tracking crimes in CityX. Built with React and featuring real-time map integration. This project was designed to protect CityX by enabling citizens to identify, locate, and report criminal activities within the city for prompt handling.

🌐 Live Demo: [https://shadow-watch.vercel.app](https://shadow-watch.vercel.app)

## Features

- 🗺️ Interactive map interface for crime reporting and visualization
- 🔍 Dynamic search functionality for crimes (by ID, type, or date)
- 📱 Fully responsive design for all devices with no UI overlaps or glitches
- 💾 Local Storage support for persistent data across sessions
- 📊 Real-time crime status tracking with visual indicators
- 🎨 Modern UI with intuitive crime type indicators and status badges
- 🔒 PWA (Progressive Web App) support for offline access
- 📝 Easy crime reporting system with map-based location selection
- 🎯 Click-to-focus functionality on crime locations from list view

## Tech Stack

- React.js
- Leaflet.js for map integration
- Tailwind CSS for styling
- Local Storage for data persistence
- Lucide Icons for UI elements

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shadow-watch.git
cd shadow-watch
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

### Vercel Deployment

1. Install Vercel CLI (optional):
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

Alternatively, you can deploy directly through the Vercel dashboard:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure your project settings
4. Deploy!

### Manual Build

To create a production build:

```bash
npm run build
```

This will create an optimized production build in the `build` folder.

## Usage

1. View all reported crimes on the interactive map
2. Use the search bar to filter crimes by ID, type, or date
3. Click on crime cards to focus on their location on the map
4. Report new crimes using the "Report Crime" button
5. Select crime location on the map
6. Fill in crime details and submit

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenStreetMap for providing map data
- React Leaflet for map integration
- Lucide Icons for the beautiful icons

## Author

Made with ♥️ by Hamzah AlNofli
