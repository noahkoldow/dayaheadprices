import React, { useEffect, useState } from 'react';
import { fetchAllRegions, compareRegionPrices } from '../services/priceService';

const PriceComparison = () => {
  const [regions, setRegions] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegions();
  }, []);

  const loadRegions = async () => {
    try {
      setLoading(true);
      const data = await fetchAllRegions();
      setRegions(data);
      // Select first two regions by default
      if (data.length >= 2) {
        setSelectedRegions([data[0].id, data[1].id]);
      }
    } catch (error) {
      console.error('Error loading regions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRegions.length > 0) {
      loadComparison();
    }
  }, [selectedRegions]);

  const loadComparison = async () => {
    try {
      const data = await compareRegionPrices(selectedRegions);
      setComparison(data);
    } catch (error) {
      console.error('Error loading comparison:', error);
    }
  };

  const toggleRegion = (regionId) => {
    setSelectedRegions(prev => {
      if (prev.includes(regionId)) {
        return prev.filter(id => id !== regionId);
      } else {
        return [...prev, regionId];
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading regions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Region Selector */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Select Regions to Compare</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {regions.map(region => (
            <button
              key={region.id}
              onClick={() => toggleRegion(region.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedRegions.includes(region.id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{region.name}</span>
                {selectedRegions.includes(region.id) && (
                  <span className="text-blue-600">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Results */}
      {comparison && comparison.regions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Price Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold">Region</th>
                  <th className="px-4 py-3 text-right font-semibold">Avg Price</th>
                  <th className="px-4 py-3 text-right font-semibold">Min Price</th>
                  <th className="px-4 py-3 text-right font-semibold">Max Price</th>
                </tr>
              </thead>
              <tbody>
                {comparison.regions.map((region, index) => (
                  <tr
                    key={region.id}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{region.name}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-lg font-bold text-blue-600">
                        €{region.averagePrice}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-green-600">
                      €{region.minPrice}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600">
                      €{region.maxPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Prices shown are in EUR per MWh for the next 24-hour period
          </p>
        </div>
      )}

      {/* Price Chart Visualization */}
      {comparison && comparison.regions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Visual Comparison</h2>
          <div className="space-y-4">
            {comparison.regions.map(region => {
              const avgPrice = parseFloat(region.averagePrice);
              const maxPossible = 100;
              const percentage = (avgPrice / maxPossible) * 100;
              
              return (
                <div key={region.id}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">{region.name}</span>
                    <span className="text-blue-600 font-bold">€{region.averagePrice}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-white text-xs font-semibold">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceComparison;
