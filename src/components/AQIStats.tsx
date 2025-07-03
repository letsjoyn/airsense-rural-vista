
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Users } from "lucide-react";

const AQIStats = () => {
  const stats = [
    {
      title: "Cities Monitored",
      value: "4,250",
      change: "+18%",
      trend: "up",
      icon: <Activity className="h-4 w-4" />
    },
    {
      title: "Active Users",
      value: "2.1M",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Avg AQI Today",
      value: "87",
      change: "-8%",
      trend: "down",
      icon: <TrendingDown className="h-4 w-4" />
    },
    {
      title: "Health Alerts Sent",
      value: "67,890",
      change: "+31%",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  const recentAlerts = [
    { location: "Meerut, UP", message: "AQI spiked to 203 - Very Poor air quality", time: "3 mins ago", severity: "error" },
    { location: "Kanpur, UP", message: "High PM2.5 levels detected - 180 μg/m³", time: "8 mins ago", severity: "warning" },
    { location: "Jaipur, RJ", message: "Air quality improved to Moderate", time: "25 mins ago", severity: "info" },
    { location: "Varanasi, UP", message: "Pollution spike due to crop burning nearby", time: "1 hour ago", severity: "error" },
    { location: "Agra, UP", message: "Evening air quality deteriorating", time: "2 hours ago", severity: "warning" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className={`text-sm font-medium flex items-center gap-1 ${
                      stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? 
                        <TrendingUp className="h-3 w-3" /> : 
                        <TrendingDown className="h-3 w-3" />
                      }
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${
                  stat.trend === 'up' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20' : 'bg-red-100 text-red-600 dark:bg-red-900/20'
                }`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Alerts */}
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'error' ? 'bg-red-500' :
                  alert.severity === 'warning' ? 'bg-orange-500' : 'bg-indigo-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{alert.location}</span>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AQIStats;
