import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCurrentPrices } from '../services/priceService';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    loadRegionData();
  }, []);

  const loadRegionData = async () => {
    try {
      setLoading(true);
      const data = await getCurrentPrices();
      setRegions(data);
    } catch (error) {
      console.error('Error loading region data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCustomIcon = (price) => {
    // Color code based on price level
    const color = price < 60 ? '#22c55e' : price < 75 ? '#eab308' : '#ef4444';
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
        ">⚡</div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading price data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <MapContainer
        center={[52.0, 10.0]}
        zoom={4}
        className="h-[600px] w-full rounded-lg shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {regions.map(region => (
          <Marker
            key={region.id}
            position={region.coordinates}
            icon={createCustomIcon(region.currentPrice.price)}
            eventHandlers={{
              click: () => setSelectedRegion(region),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{region.name}</h3>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-semibold">Current Price:</span>
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    €{region.currentPrice.price}
                  </p>
                  <p className="text-xs text-gray-600">
                    per {region.currentPrice.unit}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Hour: {region.currentPrice.hour}:00
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">Price Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Low (&lt; €60)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm">Medium (€60-75)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">High (&gt; €75)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
