
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Users } from "lucide-react";

const AQIStats = () => {
  const stats = [
    {
      title: "Cities Monitored",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: <Activity className="h-4 w-4" />
    },
    {
      title: "Active Users",
      value: "1.2M",
      change: "+8%",
      trend: "up",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Avg AQI Today",
      value: "94",
      change: "-5%",
      trend: "down",
      icon: <TrendingDown className="h-4 w-4" />
    },
    {
      title: "Health Alerts Sent",
      value: "45,678",
      change: "+23%",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  const recentAlerts = [
    { location: "Gurgaon", message: "AQI spiked to 189 - Poor air quality", time: "2 mins ago", severity: "warning" },
    { location: "Noida", message: "Air quality improved to Moderate", time: "15 mins ago", severity: "info" },
    { location: "Faridabad", message: "High PM2.5 levels detected", time: "1 hour ago", severity: "error" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-2 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'error' ? 'bg-red-500' :
                  alert.severity === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{alert.location}</span>
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
