import React, { useState } from 'react';
import Navigation from './components/Navigation';
import MapView from './components/MapView';
import PriceComparison from './components/PriceComparison';

function App() {
  const [activeView, setActiveView] = useState('map');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {activeView === 'map' ? 'Regional Price Map' : 'Price Comparison'}
          </h2>
          <p className="text-gray-600">
            {activeView === 'map' 
              ? 'View real-time day-ahead electricity prices across different regions'
              : 'Compare electricity prices between different regions'}
          </p>
        </div>
        
        {activeView === 'map' ? <MapView /> : <PriceComparison />}
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            DayAheadPrices - Track electricity market prices by region
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Data shown is simulated for demonstration purposes
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
