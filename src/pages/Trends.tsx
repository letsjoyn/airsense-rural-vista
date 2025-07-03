
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Download, Filter } from "lucide-react";
import ForecastChart from "../components/ForecastChart";

const Trends = () => {
  const [selectedCity, setSelectedCity] = useState("delhi");
  const [selectedPollutant, setSelectedPollutant] = useState("pm2.5");
  const [timeRange, setTimeRange] = useState("7d");

  const cities = [
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "bengaluru", label: "Bengaluru" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" }
  ];

  const pollutants = [
    { value: "pm2.5", label: "PM2.5" },
    { value: "pm10", label: "PM10" },
    { value: "no2", label: "NO₂" },
    { value: "so2", label: "SO₂" },
    { value: "o3", label: "O₃" },
    { value: "co", label: "CO" }
  ];

  const timeRanges = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "3m", label: "Last 3 Months" },
    { value: "1y", label: "Last Year" }
  ];

  // Mock trend data
  const trendStats = [
    { label: "Average AQI", value: "124", change: "+12%", trend: "up" },
    { label: "Peak AQI", value: "189", change: "-8%", trend: "down" },
    { label: "Good Air Days", value: "8", change: "+3", trend: "up" },
    { label: "Alert Days", value: "15", change: "-2", trend: "down" }
  ];

  const insights = [
    {
      title: "Weekly Pattern",
      description: "Air quality tends to worsen during weekdays due to increased traffic and industrial activity.",
      impact: "Moderate"
    },
    {
      title: "Seasonal Trend",
      description: "Winter months show consistently higher pollution levels due to crop burning and weather patterns.",
      impact: "High"
    },
    {
      title: "Improvement Detected",
      description: "Recent implementation of odd-even traffic rules has shown a 12% improvement in NO₂ levels.",
      impact: "Positive"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Historical AQI Trends</h1>
        <p className="text-muted-foreground">
          Analyze air quality patterns and trends over time
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Pollutant</label>
              <Select value={selectedPollutant} onValueChange={setSelectedPollutant}>
                <SelectTrigger>
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
            <div>
              <label className="text-sm font-medium mb-2 block">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {trendStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className={`text-sm font-medium flex items-center gap-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`h-3 w-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <ForecastChart 
        title={`${pollutants.find(p => p.value === selectedPollutant)?.label} Trends - ${cities.find(c => c.value === selectedCity)?.label}`}
        type="trend"
      />

      {/* Insights */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{insight.title}</h4>
                  <Badge variant={
                    insight.impact === "High" ? "destructive" :
                    insight.impact === "Positive" ? "default" : "secondary"
                  }>
                    {insight.impact}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trends;
