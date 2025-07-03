
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface ForecastChartProps {
  title: string;
  type?: "forecast" | "trend";
}

const ForecastChart = ({ title, type = "forecast" }: ForecastChartProps) => {
  // Mock data for demonstration
  const forecastData = [
    { time: "Now", aqi: 156, pm25: 89, temp: 28 },
    { time: "6h", aqi: 142, pm25: 82, temp: 26 },
    { time: "12h", aqi: 134, pm25: 78, temp: 24 },
    { time: "18h", aqi: 128, pm25: 74, temp: 22 },
    { time: "24h", aqi: 145, pm25: 85, temp: 25 },
    { time: "36h", aqi: 167, pm25: 95, temp: 27 },
    { time: "48h", aqi: 178, pm25: 102, temp: 29 },
    { time: "60h", aqi: 162, pm25: 92, temp: 28 },
    { time: "72h", aqi: 149, pm25: 86, temp: 26 }
  ];

  const trendData = [
    { date: "Jan 8", aqi: 142, pm25: 82 },
    { date: "Jan 9", aqi: 156, pm25: 89 },
    { date: "Jan 10", aqi: 134, pm25: 78 },
    { date: "Jan 11", aqi: 167, pm25: 95 },
    { date: "Jan 12", aqi: 178, pm25: 102 },
    { date: "Jan 13", aqi: 162, pm25: 92 },
    { date: "Jan 14", aqi: 149, pm25: 86 },
    { date: "Jan 15", aqi: 156, pm25: 89 }
  ];

  const data = type === "forecast" ? forecastData : trendData;
  const xAxisKey = type === "forecast" ? "time" : "date";

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "#10b981"; // green
    if (aqi <= 100) return "#f59e0b"; // yellow
    if (aqi <= 200) return "#f97316"; // orange
    if (aqi <= 300) return "#ef4444"; // red
    return "#8b5cf6"; // purple
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`${type === "forecast" ? "Time" : "Date"}: ${label}`}</p>
          <p className="text-sm">
            <span className="text-orange-600">AQI: </span>
            <span className="font-medium">{payload[0].value}</span>
          </p>
          {payload[1] && (
            <p className="text-sm">
              <span className="text-blue-600">PM2.5: </span>
              <span className="font-medium">{payload[1].value} μg/m³</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {type === "forecast" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey={xAxisKey} 
                  className="text-xs"
                />
                <YAxis className="text-xs" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="#f97316" 
                  strokeWidth={3}
                  dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pm25" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey={xAxisKey} 
                  className="text-xs"
                />
                <YAxis className="text-xs" />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="aqi" 
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>AQI</span>
          </div>
          {type === "forecast" && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>PM2.5 (μg/m³)</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
