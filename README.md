# DayAheadPrices

A Progressive Web App (PWA) for tracking day-ahead electricity market prices across different regions. Built with React, TailwindCSS, and Leaflet.js for interactive mapping.

## Features

- 📍 **Interactive Map View**: Display electricity prices on an OpenStreetMap using color-coded markers
- 📊 **Price Comparison**: Compare electricity prices across multiple regions side-by-side
- ⚡ **Real-time Updates**: View current hour pricing and 24-hour forecasts
- �� **Progressive Web App**: Works offline with service worker caching
- 🎨 **Responsive Design**: Mobile-first design using TailwindCSS
- 🗺️ **Regional Data**: Coverage for Northern, Central, Southern, and Western Europe, plus UK

## Tech Stack

- **Frontend**: React 19
- **Styling**: TailwindCSS
- **Mapping**: Leaflet.js + React-Leaflet
- **Build Tool**: Vite
- **PWA**: vite-plugin-pwa with Workbox

## Installation

1. Clone the repository:
```bash
git clone https://github.com/noahkoldow/dayaheadprices.git
cd dayaheadprices
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

Build the production-ready PWA:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

The build output will be in the `dist` directory with service worker and manifest files configured.

## Project Structure

```
dayaheadprices/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Navigation.jsx
│   │   ├── MapView.jsx
│   │   └── PriceComparison.jsx
│   ├── services/        # Data services
│   │   └── priceService.js
│   ├── styles/          # Custom styles (if needed)
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── vite.config.js       # Vite & PWA configuration
├── tailwind.config.js   # TailwindCSS configuration
└── package.json         # Project dependencies
```

## Features Overview

### Map View
- Interactive map powered by OpenStreetMap and Leaflet.js
- Color-coded markers indicating price levels:
  - 🟢 Green: Low prices (< €60/MWh)
  - 🟡 Yellow: Medium prices (€60-75/MWh)
  - 🔴 Red: High prices (> €75/MWh)
- Click markers to view detailed pricing information

### Price Comparison
- Select multiple regions to compare
- View average, minimum, and maximum prices
- Visual bar charts for easy comparison
- Tabular data display

### Data Service
Currently uses placeholder/mock data for demonstration. The service structure is ready for integration with real APIs:
- `fetchAllRegions()`: Get all available regions
- `fetchRegionPrices(regionId)`: Get prices for specific region
- `compareRegionPrices(regionIds)`: Compare multiple regions
- `getCurrentPrices()`: Get current hour prices for all regions

## PWA Features

- **Offline Support**: Service worker caches assets and map tiles
- **Install Prompt**: Can be installed on desktop and mobile devices
- **App-like Experience**: Runs in standalone mode when installed
- **Fast Loading**: Optimized build with code splitting

## Development

### Linting
```bash
npm run lint
```

### Adding New Regions
Edit `src/services/priceService.js` and add new entries to the `mockRegions` array with coordinates and region information.

## Future Enhancements

- Integration with real electricity price APIs
- Historical price data and trends
- Price alerts and notifications
- User preferences and favorites
- Multi-currency support
- Dark mode theme

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
