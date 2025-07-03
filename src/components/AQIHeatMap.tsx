
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers } from "lucide-react";

const AQIHeatMap = () => {
  // Mock data for different cities
  const cityData = [
    { name: "Delhi", aqi: 156, status: "Poor", lat: 28.6139, lng: 77.2090 },
    { name: "Mumbai", aqi: 89, status: "Moderate", lat: 19.0760, lng: 72.8777 },
    { name: "Bengaluru", aqi: 67, status: "Moderate", lat: 12.9716, lng: 77.5946 },
    { name: "Chennai", aqi: 78, status: "Moderate", lat: 13.0827, lng: 80.2707 },
    { name: "Kolkata", aqi: 134, status: "Poor", lat: 22.5726, lng: 88.3639 },
    { name: "Hyderabad", aqi: 92, status: "Moderate", lat: 17.3850, lng: 78.4867 },
    { name: "Pune", aqi: 85, status: "Moderate", lat: 18.5204, lng: 73.8567 },
    { name: "Ahmedabad", aqi: 112, status: "Poor", lat: 23.0225, lng: 72.5714 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-green-500";
      case "Moderate": return "bg-yellow-500";
      case "Poor": return "bg-orange-500";
      case "Very Poor": return "bg-red-500";
      case "Severe": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              India AQI Heatmap
            </CardTitle>
            <Badge variant="secondary">Live Data</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg overflow-hidden">
            {/* Map container - in production, this would be replaced with actual map component */}
            <div className="h-96 relative">
              {/* India map outline placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl text-muted-foreground/20">🗺️</div>
              </div>
              
              {/* City markers */}
              {cityData.map((city, index) => (
                <div
                  key={city.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${20 + (index % 4) * 20}%`,
                    top: `${20 + Math.floor(index / 4) * 20}%`
                  }}
                >
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(city.status)} animate-pulse`}></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                    <div className="bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      {city.name}: {city.aqi} AQI
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Map controls */}
            <div className="absolute top-4 right-4 space-y-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
                <div className="text-xs font-medium mb-2">AQI Scale</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Good (0-50)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs">Moderate (51-100)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-xs">Poor (101-200)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs">Very Poor (201-300)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-xs">Severe (300+)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Interactive map showing real-time AQI data across India. Click on markers for detailed information.
          </p>
        </CardContent>
      </Card>

      {/* City List */}
      <Card>
        <CardHeader>
          <CardTitle>Major Cities AQI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cityData.map((city) => (
              <div key={city.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{city.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{city.aqi}</span>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(city.status)}`}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AQIHeatMap;
