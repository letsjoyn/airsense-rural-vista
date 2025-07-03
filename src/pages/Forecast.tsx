
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cloud, Sun, CloudRain, Wind, TrendingUp, AlertTriangle } from "lucide-react";
import ForecastChart from "../components/ForecastChart";

const Forecast = () => {
  const [selectedPollutant, setSelectedPollutant] = useState("overall");
  
  const pollutants = [
    { value: "overall", label: "Overall AQI" },
    { value: "pm2.5", label: "PM2.5" },
    { value: "pm10", label: "PM10" },
    { value: "no2", label: "NO₂" },
    { value: "so2", label: "SO₂" },
    { value: "o3", label: "O₃" }
  ];

  // Mock forecast data
  const dailyForecast = [
    {
      day: "Today",
      date: "Jan 15",
      aqi: 156,
      status: "Poor",
      weather: "Cloudy",
      temp: { high: 28, low: 18 },
      icon: <Cloud className="h-6 w-6" />,
      recommendations: ["Wear mask outdoors", "Limit outdoor activities"]
    },
    {
      day: "Tomorrow",
      date: "Jan 16",
      aqi: 142,
      status: "Poor",
      weather: "Partly Cloudy",
      temp: { high: 26, low: 16 },
      icon: <Sun className="h-6 w-6" />,
      recommendations: ["Air quality improving", "Monitor sensitive groups"]
    },
    {
      day: "Day 3",
      date: "Jan 17",
      aqi: 178,
      status: "Poor",
      weather: "Foggy",
      temp: { high: 24, low: 14 },
      icon: <CloudRain className="h-6 w-6" />,
      recommendations: ["Poor visibility", "Avoid outdoor exercise"]
    }
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

  const hourlyData = [
    { time: "12 PM", aqi: 156, trend: "stable" },
    { time: "6 PM", aqi: 162, trend: "up" },
    { time: "12 AM", aqi: 148, trend: "down" },
    { time: "6 AM", aqi: 134, trend: "down" },
    { time: "12 PM", aqi: 142, trend: "up" },
    { time: "6 PM", aqi: 156, trend: "up" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Air Quality Forecast</h1>
        <p className="text-muted-foreground">
          72-hour AQI predictions using weather and historical data
        </p>
      </div>

      {/* Alert Banner */}
      <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-orange-600 mt-1" />
            <div>
              <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                Forecast Alert
              </h3>
              <p className="text-orange-700 dark:text-orange-300">
                Air quality is expected to worsen over the next 48 hours due to stagnant weather conditions. 
                Plan indoor activities and keep masks ready.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Pollutant:</label>
            <Select value={selectedPollutant} onValueChange={setSelectedPollutant}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pollutants.map((pollutant) => (
                  <SelectItem key={pollutant.value} value={pollutant.value}>
                    {pollutant.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 3-Day Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {dailyForecast.map((day, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{day.day}</CardTitle>
                  <p className="text-sm text-muted-foreground">{day.date}</p>
                </div>
                <div className="text-muted-foreground">
                  {day.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* AQI */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(day.status)}`}></div>
                    <Badge variant="secondary" className={getStatusTextColor(day.status)}>
                      {day.status}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold">{day.aqi}</div>
                  <p className="text-sm text-muted-foreground">AQI</p>
                </div>

                {/* Weather */}
                <div className="text-center">
                  <p className="text-sm font-medium">{day.weather}</p>
                  <p className="text-sm text-muted-foreground">
                    {day.temp.high}°/{day.temp.low}°C
                  </p>
                </div>

                {/* Recommendations */}
                <div className="space-y-1">
                  {day.recommendations.map((rec, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      • {rec}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hourly Forecast */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Next 24 Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {hourlyData.map((hour, index) => (
              <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">{hour.time}</p>
                <div className="text-2xl font-bold mb-1">{hour.aqi}</div>
                <div className="flex items-center justify-center">
                  <TrendingUp className={`h-4 w-4 ${
                    hour.trend === 'up' ? 'text-red-500' : 
                    hour.trend === 'down' ? 'text-green-500 rotate-180' : 
                    'text-gray-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Forecast Chart */}
      <ForecastChart 
        title={`${pollutants.find(p => p.value === selectedPollutant)?.label || 'Overall AQI'} - 72 Hour Forecast`}
        type="forecast"
      />

      {/* Factors Affecting Forecast */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5" />
            Factors Affecting Air Quality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Weather Conditions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Wind Speed</span>
                  <span className="font-medium">8 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>Humidity</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between">
                  <span>Temperature</span>
                  <span className="font-medium">28°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Pressure</span>
                  <span className="font-medium">1013 hPa</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contributing Factors</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Vehicle emissions (High)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Industrial activity (Medium)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Construction dust (Medium)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span>Crop burning (Low)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forecast;
