
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const AQIHeatMap = () => {
  // Expanded dataset with tier-2 and rural cities
  const cityData = [
    // Metro cities
    { name: "Delhi", aqi: 178, status: "Poor", lat: 28.6139, lng: 77.2090, state: "DL" },
    { name: "Mumbai", aqi: 95, status: "Moderate", lat: 19.0760, lng: 72.8777, state: "MH" },
    { name: "Bengaluru", aqi: 72, status: "Moderate", lat: 12.9716, lng: 77.5946, state: "KA" },
    { name: "Chennai", aqi: 84, status: "Moderate", lat: 13.0827, lng: 80.2707, state: "TN" },
    { name: "Kolkata", aqi: 145, status: "Poor", lat: 22.5726, lng: 88.3639, state: "WB" },
    { name: "Hyderabad", aqi: 98, status: "Moderate", lat: 17.3850, lng: 78.4867, state: "TS" },
    
    // Tier-2 cities
    { name: "Kanpur", aqi: 203, status: "Very Poor", lat: 26.4499, lng: 80.3319, state: "UP" },
    { name: "Agra", aqi: 167, status: "Poor", lat: 27.1767, lng: 78.0081, state: "UP" },
    { name: "Varanasi", aqi: 189, status: "Poor", lat: 25.3176, lng: 82.9739, state: "UP" },
    { name: "Meerut", aqi: 195, status: "Poor", lat: 28.9845, lng: 77.7064, state: "UP" },
    { name: "Jaipur", aqi: 134, status: "Poor", lat: 26.9124, lng: 75.7873, state: "RJ" },
    { name: "Jodhpur", aqi: 112, status: "Poor", lat: 26.2389, lng: 73.0243, state: "RJ" },
    { name: "Indore", aqi: 89, status: "Moderate", lat: 22.7196, lng: 75.8577, state: "MP" },
    { name: "Bhopal", aqi: 76, status: "Moderate", lat: 23.2599, lng: 77.4126, state: "MP" },
    { name: "Patna", aqi: 178, status: "Poor", lat: 25.5941, lng: 85.1376, state: "BR" },
    { name: "Gaya", aqi: 156, status: "Poor", lat: 24.7914, lng: 85.0002, state: "BR" },
    
    // Rural/Small towns
    { name: "Muzaffarpur", aqi: 142, status: "Poor", lat: 26.1209, lng: 85.3647, state: "BR" },
    { name: "Saharsa", aqi: 98, status: "Moderate", lat: 25.8804, lng: 86.5956, state: "BR" },
    { name: "Firozabad", aqi: 187, status: "Poor", lat: 27.1591, lng: 78.3957, state: "UP" },
    { name: "Moradabad", aqi: 165, status: "Poor", lat: 28.8386, lng: 78.7733, state: "UP" },
    { name: "Bareilly", aqi: 156, status: "Poor", lat: 28.3670, lng: 79.4304, state: "UP" },
    { name: "Aligarh", aqi: 143, status: "Poor", lat: 27.8974, lng: 78.0880, state: "UP" },
    { name: "Mathura", aqi: 134, status: "Poor", lat: 27.4924, lng: 77.6737, state: "UP" },
    { name: "Haridwar", aqi: 118, status: "Poor", lat: 29.9457, lng: 78.1642, state: "UK" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-emerald-500";
      case "Moderate": return "bg-yellow-500";
      case "Poor": return "bg-orange-500";
      case "Very Poor": return "bg-red-500";
      case "Severe": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "Good": return "text-emerald-600 bg-emerald-50 dark:bg-emerald-950";
      case "Moderate": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950";
      case "Poor": return "text-orange-600 bg-orange-50 dark:bg-orange-950";
      case "Very Poor": return "text-red-600 bg-red-50 dark:bg-red-950";
      case "Severe": return "text-purple-600 bg-purple-50 dark:bg-purple-950";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-950";
    }
  };

  // Get worst cities
  const worstCities = cityData
    .sort((a, b) => b.aqi - a.aqi)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-teal-600" />
              India AQI Heatmap
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                Live Data
              </Badge>
              <Badge variant="destructive" className="animate-pulse">
                {worstCities.length} Alerts
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-teal-50 to-indigo-50 dark:from-teal-950 dark:to-indigo-950 rounded-lg overflow-hidden border">
            {/* Map container */}
            <div className="h-96 relative">
              {/* India map outline placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl text-muted-foreground/20">🗺️</div>
              </div>
              
              {/* City markers with improved positioning */}
              {cityData.slice(0, 12).map((city, index) => (
                <motion.div
                  key={city.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${15 + (index % 4) * 20}%`,
                    top: `${15 + Math.floor(index / 4) * 25}%`
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(city.status)} animate-pulse ring-2 ring-white shadow-lg`}></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                      <div className="font-semibold">{city.name}, {city.state}</div>
                      <div className="text-gray-300">AQI: {city.aqi} ({city.status})</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Map Legend */}
            <div className="absolute top-4 right-4 space-y-2">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                <div className="text-xs font-semibold mb-2 text-slate-700 dark:text-slate-300">AQI Scale</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Good (0-50)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Moderate (51-100)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Poor (101-200)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Very Poor (201-300)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">Severe (300+)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Interactive map showing real-time AQI data across India including tier-2 cities and rural areas. Hover over markers for detailed information.
          </p>
        </CardContent>
      </Card>

      {/* Worst Air Quality Cities Alert */}
      <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Cities with Worst Air Quality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {worstCities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-semibold text-sm">{city.name}</div>
                    <div className="text-xs text-muted-foreground">{city.state}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{city.aqi}</div>
                  <Badge className={`text-xs px-2 py-0.5 ${getStatusColorClass(city.status)}`}>
                    {city.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Cities Grid */}
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Monitored Cities ({cityData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {cityData.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(city.status)}`}></div>
                  <div>
                    <span className="font-medium text-sm">{city.name}</span>
                    <span className="text-xs text-muted-foreground ml-1">({city.state})</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm">{city.aqi}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AQIHeatMap;
