
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react";

interface ForecastChartProps {
  title: string;
  type?: "forecast" | "trend";
}

const ForecastChart = ({ title, type = "forecast" }: ForecastChartProps) => {
  const [timeRange, setTimeRange] = useState<"24h" | "48h" | "72h">("72h");
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  // Enhanced mock data with detailed pollutants
  const forecastData = {
    "24h": [
      { time: "Now", aqi: 156, pm25: 89, pm10: 95, no2: 45, co: 2.1, o3: 87, so2: 12, nh3: 8 },
      { time: "3h", aqi: 149, pm25: 85, pm10: 91, no2: 42, co: 2.0, o3: 82, so2: 11, nh3: 7 },
      { time: "6h", aqi: 142, pm25: 82, pm10: 88, no2: 40, co: 1.9, o3: 78, so2: 10, nh3: 7 },
      { time: "9h", aqi: 138, pm25: 79, pm10: 85, no2: 38, co: 1.8, o3: 75, so2: 9, nh3: 6 },
      { time: "12h", aqi: 134, pm25: 78, pm10: 82, no2: 36, co: 1.8, o3: 74, so2: 9, nh3: 6 },
      { time: "15h", aqi: 128, pm25: 74, pm10: 79, no2: 34, co: 1.7, o3: 71, so2: 8, nh3: 5 },
      { time: "18h", aqi: 135, pm25: 76, pm10: 81, no2: 37, co: 1.8, o3: 73, so2: 9, nh3: 6 },
      { time: "21h", aqi: 145, pm25: 83, pm10: 89, no2: 41, co: 1.9, o3: 79, so2: 10, nh3: 7 },
      { time: "24h", aqi: 152, pm25: 87, pm10: 93, no2: 44, co: 2.0, o3: 84, so2: 11, nh3: 8 }
    ],
    "48h": [
      { time: "Now", aqi: 156, pm25: 89, pm10: 95, no2: 45, co: 2.1, o3: 87, so2: 12, nh3: 8 },
      { time: "12h", aqi: 134, pm25: 78, pm10: 82, no2: 36, co: 1.8, o3: 74, so2: 9, nh3: 6 },
      { time: "24h", aqi: 145, pm25: 85, pm10: 89, no2: 41, co: 1.9, o3: 79, so2: 10, nh3: 7 },
      { time: "36h", aqi: 167, pm25: 95, pm10: 102, no2: 48, co: 2.3, o3: 91, so2: 13, nh3: 9 },
      { time: "48h", aqi: 172, pm25: 98, pm10: 106, no2: 51, co: 2.4, o3: 94, so2: 14, nh3: 10 }
    ],
    "72h": [
      { time: "Now", aqi: 156, pm25: 89, pm10: 95, no2: 45, co: 2.1, o3: 87, so2: 12, nh3: 8 },
      { time: "12h", aqi: 134, pm25: 78, pm10: 82, no2: 36, co: 1.8, o3: 74, so2: 9, nh3: 6 },
      { time: "24h", aqi: 145, pm25: 85, pm10: 89, no2: 41, co: 1.9, o3: 79, so2: 10, nh3: 7 },
      { time: "36h", aqi: 167, pm25: 95, pm10: 102, no2: 48, co: 2.3, o3: 91, so2: 13, nh3: 9 },
      { time: "48h", aqi: 178, pm25: 102, pm10: 110, no2: 52, co: 2.5, o3: 98, so2: 15, nh3: 11 },
      { time: "60h", aqi: 162, pm25: 92, pm10: 98, no2: 47, co: 2.2, o3: 89, so2: 12, nh3: 9 },
      { time: "72h", aqi: 149, pm25: 86, pm10: 92, no2: 43, co: 2.0, o3: 82, so2: 11, nh3: 8 }
    ]
  };

  const data = forecastData[timeRange];

  const pollutants = [
    { key: "pm25", name: "PM2.5", unit: "μg/m³", color: "#ef4444", safeLimit: 15 },
    { key: "pm10", name: "PM10", unit: "μg/m³", color: "#f97316", safeLimit: 50 },
    { key: "no2", name: "NO₂", unit: "μg/m³", color: "#eab308", safeLimit: 40 },
    { key: "co", name: "CO", unit: "mg/m³", color: "#22c55e", safeLimit: 4 },
    { key: "o3", name: "O₃", unit: "μg/m³", color: "#3b82f6", safeLimit: 100 },
    { key: "so2", name: "SO₂", unit: "μg/m³", color: "#8b5cf6", safeLimit: 20 },
    { key: "nh3", name: "NH₃", unit: "μg/m³", color: "#ec4899", safeLimit: 200 }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "#10b981";
    if (aqi <= 100) return "#f59e0b";
    if (aqi <= 200) return "#f97316";
    if (aqi <= 300) return "#ef4444";
    return "#8b5cf6";
  };

  const getStatusBadge = (current: number, safe: number) => {
    const ratio = current / safe;
    if (ratio <= 1) return { text: "Safe", color: "bg-green-500" };
    if (ratio <= 2) return { text: "Moderate", color: "bg-yellow-500" };
    if (ratio <= 3) return { text: "Unhealthy", color: "bg-orange-500" };
    return { text: "Hazardous", color: "bg-red-500" };
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 shadow-xl">
          <p className="font-medium text-white mb-2">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm text-slate-300">
              <span style={{ color: entry.color }}>{entry.name}: </span>
              <span className="font-medium text-white">{entry.value}</span>
              {entry.name !== "AQI" && <span className="text-slate-400 ml-1">
                {pollutants.find(p => p.key === entry.dataKey)?.unit}
              </span>}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-400" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
              className="text-xs"
            >
              Line
            </Button>
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("bar")}
              className="text-xs"
            >
              Bar
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {(["24h", "48h", "72h"] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="text-xs"
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#1d4ed8" }}
                  name="AQI"
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="aqi" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="AQI"
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Pollutant Details */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-600">Overview</TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-slate-600">Detailed Pollutants</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {pollutants.slice(0, 4).map((pollutant) => {
                const currentValue = data[0][pollutant.key as keyof typeof data[0]] as number;
                const status = getStatusBadge(currentValue, pollutant.safeLimit);
                const peakValue = Math.max(...data.map(d => d[pollutant.key as keyof typeof d] as number));
                const change = ((data[data.length - 1][pollutant.key as keyof typeof data[0]] as number) - currentValue) / currentValue * 100;
                
                return (
                  <div key={pollutant.key} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{pollutant.name}</h4>
                      <Badge className={`${status.color} text-white text-xs`}>
                        {status.text}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{currentValue}</span>
                        <span className="text-xs text-slate-400">{pollutant.unit}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>Peak: {peakValue}{pollutant.unit}</span>
                        <div className="flex items-center gap-1">
                          {change > 0 ? (
                            <TrendingUp className="h-3 w-3 text-red-400" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-green-400" />
                          )}
                          <span className={change > 0 ? "text-red-400" : "text-green-400"}>
                            {Math.abs(change).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        Safe limit: {pollutant.safeLimit} {pollutant.unit}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip content={<CustomTooltip />} />
                  {pollutants.slice(0, 5).map((pollutant) => (
                    <Line
                      key={pollutant.key}
                      type="monotone"
                      dataKey={pollutant.key}
                      stroke={pollutant.color}
                      strokeWidth={2}
                      dot={{ fill: pollutant.color, r: 3 }}
                      name={pollutant.name}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {pollutants.slice(0, 5).map((pollutant) => (
                <div key={pollutant.key} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: pollutant.color }}
                  ></div>
                  <span className="text-slate-300">{pollutant.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Health Advisory */}
        <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white mb-2">Health Advisory</h4>
              <p className="text-sm text-slate-300">
                Based on current forecast, air quality will remain in the "Poor" category. 
                Sensitive individuals should limit prolonged outdoor activities. 
                Consider wearing N95 masks when going outside during peak pollution hours.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
