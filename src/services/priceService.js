/**
 * Service for fetching day-ahead electricity price data
 * This is a placeholder implementation with mock data
 */

// Mock regions with their coordinates and price data
const mockRegions = [
  {
    id: 'north-eu',
    name: 'Northern Europe',
    coordinates: [60.1699, 24.9384], // Helsinki
    prices: generateMockPrices(45, 85)
  },
  {
    id: 'central-eu',
    name: 'Central Europe',
    coordinates: [52.5200, 13.4050], // Berlin
    prices: generateMockPrices(50, 90)
  },
  {
    id: 'south-eu',
    name: 'Southern Europe',
    coordinates: [41.9028, 12.4964], // Rome
    prices: generateMockPrices(55, 95)
  },
  {
    id: 'west-eu',
    name: 'Western Europe',
    coordinates: [48.8566, 2.3522], // Paris
    prices: generateMockPrices(48, 88)
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    coordinates: [51.5074, -0.1278], // London
    prices: generateMockPrices(52, 92)
  }
];

/**
 * Generate mock price data for 24 hours
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {Array} Array of price data for each hour
 */
function generateMockPrices(min, max) {
  const prices = [];
  const now = new Date();
  
  for (let hour = 0; hour < 24; hour++) {
    const timestamp = new Date(now);
    timestamp.setHours(hour, 0, 0, 0);
    
    // Simulate price variation throughout the day
    const baseVariation = Math.sin((hour - 6) * Math.PI / 12) * 0.3 + 0.7;
    const randomVariation = Math.random() * 0.2 + 0.9;
    const price = (min + (max - min) * baseVariation * randomVariation).toFixed(2);
    
    prices.push({
      hour,
      timestamp: timestamp.toISOString(),
      price: parseFloat(price),
      currency: 'EUR',
      unit: 'MWh'
    });
  }
  
  return prices;
}

/**
 * Fetch all regions with their price data
 * Simulates an API call with a delay
 * @returns {Promise<Array>} Promise resolving to array of regions
 */
export async function fetchAllRegions() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRegions;
}

/**
 * Fetch price data for a specific region
 * @param {string} regionId - The ID of the region
 * @returns {Promise<Object>} Promise resolving to region data
 */
export async function fetchRegionPrices(regionId) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const region = mockRegions.find(r => r.id === regionId);
  if (!region) {
    throw new Error(`Region ${regionId} not found`);
  }
  
  return region;
}

/**
 * Compare prices between multiple regions
 * @param {Array<string>} regionIds - Array of region IDs to compare
 * @returns {Promise<Object>} Promise resolving to comparison data
 */
export async function compareRegionPrices(regionIds) {
  const regions = await Promise.all(
    regionIds.map(id => fetchRegionPrices(id))
  );
  
  const comparison = {
    regions: regions.map(r => ({
      id: r.id,
      name: r.name,
      averagePrice: (r.prices.reduce((sum, p) => sum + p.price, 0) / r.prices.length).toFixed(2),
      minPrice: Math.min(...r.prices.map(p => p.price)).toFixed(2),
      maxPrice: Math.max(...r.prices.map(p => p.price)).toFixed(2)
    }))
  };
  
  return comparison;
}

/**
 * Get current hour price for all regions
 * @returns {Promise<Array>} Promise resolving to current prices
 */
export async function getCurrentPrices() {
  const regions = await fetchAllRegions();
  const currentHour = new Date().getHours();
  
  return regions.map(region => ({
    id: region.id,
    name: region.name,
    coordinates: region.coordinates,
    currentPrice: region.prices[currentHour]
  }));
}
