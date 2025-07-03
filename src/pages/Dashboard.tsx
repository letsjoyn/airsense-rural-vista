
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Thermometer, Droplets, Wind, Eye, AlertTriangle, TrendingUp } from "lucide-react";
import AQIHeatMap from "../components/AQIHeatMap";
import AQIStats from "../components/AQIStats";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<"map" | "cards">("cards");
  const [selectedLocation, setSelectedLocation] = useState("Delhi, India");

  // Mock data - replace with real API calls
  const currentAQI = {
    overall: 156,
    level: "Poor",
    color: "bg-orange-500",
    pollutants: {
      "PM2.5": { value: 89, unit: "μg/m³", status: "Poor" },
      "PM10": { value: 134, unit: "μg/m³", status: "Poor" },
      "NO₂": { value: 45, unit: "μg/m³", status: "Moderate" },
      "SO₂": { value: 12, unit: "μg/m³", status: "Good" },
      "O₃": { value: 67, unit: "μg/m³", status: "Moderate" },
      "CO": { value: 1.2, unit: "mg/m³", status: "Good" }
    },
    weather: {
      temperature: 28,
      humidity: 65,
      windSpeed: 8,
      visibility: 4.2
    },
    lastUpdated: "2024-01-15T10:30:00Z"
  };

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

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "Good": return "text-green-600";
      case "Moderate": return "text-yellow-600";
      case "Poor": return "text-orange-600";
      case "Very Poor": return "text-red-600";
      case "Severe": return "text-purple-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Real-Time AQI Dashboard</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{selectedLocation}</span>
              <span className="text-xs">
                Last updated: {new Date(currentAQI.lastUpdated).toLocaleTimeString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              onClick={() => setViewMode("cards")}
              size="sm"
            >
              Card View
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
              size="sm"
            >
              Map View
            </Button>
          </div>
        </div>
      </div>

      {/* Main AQI Card */}
      <Card className="mb-8 border-2">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-4 h-4 rounded-full ${currentAQI.color}`}></div>
                <Badge variant="secondary" className={`${getStatusTextColor(currentAQI.level)} text-lg px-3 py-1`}>
                  {currentAQI.level}
                </Badge>
              </div>
              <h2 className="text-5xl font-bold mb-2">{currentAQI.overall}</h2>
              <p className="text-xl text-muted-foreground">Air Quality Index</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <Thermometer className="h-6 w-6 mx-auto mb-2 text-red-500" />
                <p className="text-2xl font-semibold">{currentAQI.weather.temperature}°C</p>
                <p className="text-sm text-muted-foreground">Temperature</p>
              </div>
              <div className="text-center">
                <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-semibold">{currentAQI.weather.humidity}%</p>
                <p className="text-sm text-muted-foreground">Humidity</p>
              </div>
              <div className="text-center">
                <Wind className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-semibold">{currentAQI.weather.windSpeed}</p>
                <p className="text-sm text-muted-foreground">km/h</p>
              </div>
              <div className="text-center">
                <Eye className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <p className="text-2xl font-semibold">{currentAQI.weather.visibility}</p>
                <p className="text-sm text-muted-foreground">km</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "cards" ? (
        <>
          {/* Pollutant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(currentAQI.pollutants).map(([pollutant, data]) => (
              <Card key={pollutant} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pollutant}</CardTitle>
                    <Badge variant="secondary" className={getStatusTextColor(data.status)}>
                      {data.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-3xl font-bold">{data.value}</span>
                    <span className="text-sm text-muted-foreground mb-1">{data.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div 
                      className={`h-2 rounded-full ${getStatusColor(data.status)}`}
                      style={{ width: `${Math.min((data.value / 200) * 100, 100)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Statistics Component */}
          <AQIStats />
        </>
      ) : (
        <AQIHeatMap />
      )}

      {/* Alert Section */}
      <Card className="mt-8 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-orange-600 mt-1" />
            <div>
              <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                Air Quality Alert
              </h3>
              <p className="text-orange-700 dark:text-orange-300 mb-3">
                Air quality is currently poor. Sensitive individuals should avoid outdoor activities. 
                Consider wearing a mask if you need to go outside.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                  View Health Advisory
                </Button>
                <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                  Setup Alerts
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
