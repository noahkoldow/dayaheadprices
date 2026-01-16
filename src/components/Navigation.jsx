import React from 'react';

const Navigation = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'map', label: 'Map View', icon: '🗺️' },
    { id: 'compare', label: 'Compare Prices', icon: '📊' }
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            <h1 className="text-xl font-bold">DayAheadPrices</h1>
          </div>
          <div className="flex space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeView === item.id
                    ? 'bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
