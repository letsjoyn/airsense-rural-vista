
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, TrendingUp, Shield, Bell, Wind, Leaf, Heart } from "lucide-react";

const Home = () => {
  const [searchLocation, setSearchLocation] = useState("");

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-emerald-600" />,
      title: "Hyperlocal Coverage",
      description: "Real-time AQI data for rural and small-town India, not just metros"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Predictive Forecasts",
      description: "72-hour AQI predictions using satellite and ground station data"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Health Advisory",
      description: "Personalized recommendations based on your location and health profile"
    },
    {
      icon: <Bell className="h-8 w-8 text-orange-600" />,
      title: "Smart Alerts",
      description: "Get notified about pollution spikes and health recommendations"
    }
  ];

  const aqiLevels = [
    { range: "0-50", label: "Good", color: "bg-green-500", description: "Great for outdoor activities" },
    { range: "51-100", label: "Moderate", color: "bg-yellow-500", description: "Generally acceptable" },
    { range: "101-200", label: "Poor", color: "bg-orange-500", description: "Sensitive groups at risk" },
    { range: "201-300", label: "Very Poor", color: "bg-red-500", description: "Health warnings" },
    { range: "300+", label: "Severe", color: "bg-purple-500", description: "Emergency conditions" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-950 dark:via-blue-950 dark:to-purple-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Wind className="h-16 w-16 mx-auto text-emerald-600 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Breathe Better with AirSense
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Granular, Real-Time & Predictive Air Quality Information for Every Indian
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Enter your city or location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 pr-4 py-3 text-center rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 dark:border-emerald-800"
                />
              </div>
              <Button asChild className="w-full mt-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white">
                <Link to="/dashboard">Check Air Quality</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Satellite Imagery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span>AI Predictions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AirSense?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built specifically for India's diverse geography, focusing on underserved regions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AQI Guide Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Understanding AQI Levels</h2>
            <p className="text-xl text-muted-foreground">
              Know what the numbers mean for your health
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {aqiLevels.map((level, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 rounded-full ${level.color} mx-auto mb-3 flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{level.range}</span>
                    </div>
                    <Badge variant="secondary" className="mb-2">{level.label}</Badge>
                    <p className="text-xs text-muted-foreground">{level.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Leaf className="h-16 w-16 mx-auto mb-6 text-white" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Monitoring Your Air Quality Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of Indians taking control of their air quality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-emerald-600">
                <Link to="/health">Health Advisory</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
