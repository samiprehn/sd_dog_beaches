import React, { useState, useEffect } from 'react';
import { Cloud, Waves, Camera, MapPin, Wind, Droplets, Sun, Loader2 } from 'lucide-react';

const beaches = [
  {
    name: "Ocean Beach Dog Beach",
    location: "San Diego",
    lat: 32.7503,
    lon: -117.2517,
    webcam: "https://www.surfline.com/surf-report/ocean-beach-dog-beach/5842041f4e65fad6a7708815"
  },
  {
    name: "Del Mar Dog Beach",
    location: "Del Mar",
    lat: 32.9595,
    lon: -117.2654,
    webcam: "https://www.surfline.com/surf-report/del-mar/5842041f4e65fad6a7708990"
  },
  {
    name: "Coronado Dog Beach",
    location: "Coronado",
    lat: 32.6859,
    lon: -117.1831,
    webcam: "https://www.surfline.com/surf-report/coronado/5842041f4e65fad6a770881c"
  }
];

export default function DogBeachChecker() {
  const [selectedBeach, setSelectedBeach] = useState(0);
  const [weather, setWeather] = useState(null);
  const [tides, setTides] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const beach = beaches[selectedBeach];

  useEffect(() => {
    fetchData();
  }, [selectedBeach]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch weather data
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${beach.lat}&longitude=${beach.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America/Los_Angeles`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.current);

      // Fetch tide data
      const today = new Date().toISOString().split('T')[0];
      const tideRes = await fetch(
        `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=${today}&end_date=${today}&station=9410170&product=predictions&datum=MLLW&time_zone=lst_ldt&units=english&interval=hilo&format=json`
      );
      const tideData = await tideRes.json();
      setTides(tideData.predictions || []);
    } catch (err) {
      setError("Unable to load data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: "Clear",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Foggy",
      51: "Light Drizzle",
      61: "Light Rain",
      63: "Moderate Rain",
      80: "Rain Showers"
    };
    return weatherCodes[code] || "Unknown";
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-300 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Waves className="w-8 h-8" />
              <h1 className="text-3xl font-bold">San Diego Dog Beach Conditions</h1>
            </div>
            <p className="text-blue-100">Real-time weather, tides, and webcams</p>
          </div>

          {/* Beach Selection */}
          <div className="p-6 bg-gray-50 border-b">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {beaches.map((b, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedBeach(idx)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedBeach === idx
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className={`w-5 h-5 ${selectedBeach === idx ? 'text-blue-600' : 'text-gray-400'}`} />
                    <h3 className="font-semibold text-gray-900">{b.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{b.location}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                {error}
              </div>
            )}

            {!loading && !error && weather && (
              <div className="space-y-6">
                {/* Weather */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Cloud className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">Current Weather</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Sun className="w-4 h-4" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{Math.round(weather.temperature_2m)}°F</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Cloud className="w-4 h-4" />
                        <span className="text-sm">Conditions</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{getWeatherDescription(weather.weather_code)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Wind className="w-4 h-4" />
                        <span className="text-sm">Wind</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {Math.round(weather.wind_speed_10m)} mph {getWindDirection(weather.wind_direction_10m)}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Droplets className="w-4 h-4" />
                        <span className="text-sm">Humidity</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{weather.relative_humidity_2m}%</p>
                    </div>
                  </div>
                </div>

                {/* Tides */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Waves className="w-6 h-6 text-cyan-600" />
                    <h2 className="text-xl font-bold text-gray-900">Today's Tides</h2>
                  </div>
                  {tides && tides.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {tides.map((tide, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg">
                          <p className={`text-sm font-semibold mb-1 ${tide.type === 'H' ? 'text-blue-600' : 'text-orange-600'}`}>
                            {tide.type === 'H' ? 'High Tide' : 'Low Tide'}
                          </p>
                          <p className="text-lg font-bold text-gray-900">{new Date(tide.t).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                          <p className="text-sm text-gray-600">{parseFloat(tide.v).toFixed(1)} ft</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">Tide data unavailable</p>
                  )}
                </div>

                {/* Webcam */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Camera className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-900">Live Webcam</h2>
                  </div>
                  <a
                    href={beach.webcam}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
                  >
                    View Live Conditions on Surfline →
                  </a>
                  <p className="text-sm text-gray-600 mt-2 text-center">Opens surf report and webcam in new tab</p>
                </div>

                {/* Dog Beach Tips */}
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-sm text-gray-700">
                    <strong>🐕 Tip:</strong> Best times are usually early morning or late afternoon to avoid crowds. Always bring fresh water for your pup and clean up after them!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-white text-sm mt-4">
          Weather data from Open-Meteo | Tide data from NOAA
        </p>
      </div>
    </div>
  );
}
