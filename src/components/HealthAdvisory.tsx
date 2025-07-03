
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Heart, Shield, School, Home, Activity } from "lucide-react";

interface HealthAdvisoryProps {
  currentAQI: number;
  currentLevel: string;
}

const HealthAdvisory = ({ currentAQI, currentLevel }: HealthAdvisoryProps) => {
  const getHealthAdvice = (aqi: number) => {
    if (aqi <= 50) {
      return {
        general: "Great day for outdoor activities! Air quality is excellent.",
        sensitive: "Perfect conditions for everyone, including sensitive individuals.",
        activities: ["Outdoor exercise encouraged", "Windows can stay open", "Perfect for cycling/walking"],
        precautions: ["No special precautions needed"],
        color: "green"
      };
    } else if (aqi <= 100) {
      return {
        general: "Air quality is generally acceptable for most people.",
        sensitive: "Sensitive individuals may experience minor symptoms.",
        activities: ["Normal outdoor activities OK", "Exercise outdoors is fine", "Good for school activities"],
        precautions: ["Monitor sensitive family members"],
        color: "yellow"
      };
    } else if (aqi <= 200) {
      return {
        general: "Air quality is poor. Reduce outdoor exposure.",
        sensitive: "Sensitive groups should avoid outdoor activities.",
        activities: ["Limit prolonged outdoor activities", "Wear mask when going out", "Keep windows closed"],
        precautions: ["Use air purifier indoors", "Avoid outdoor exercise", "Children should play indoors"],
        color: "orange"
      };
    } else if (aqi <= 300) {
      return {
        general: "Very unhealthy air. Avoid outdoor activities.",
        sensitive: "Health warnings for everyone. Stay indoors.",
        activities: ["Stay indoors as much as possible", "Mandatory masks outdoors", "Cancel outdoor events"],
        precautions: ["Use N95 masks", "Air purifier essential", "Avoid opening windows"],
        color: "red"
      };
    } else {
      return {
        general: "Hazardous air quality. Emergency conditions.",
        sensitive: "Everyone should avoid outdoor exposure.",
        activities: ["Do not go outdoors", "Cancel all outdoor activities", "Emergency measures needed"],
        precautions: ["Seal home from outside air", "Medical attention if breathing issues"],
        color: "purple"
      };
    }
  };

  const advice = getHealthAdvice(currentAQI);

  const healthGroups = [
    {
      title: "General Population",
      icon: <Heart className="h-6 w-6" />,
      description: advice.general,
      severity: advice.color
    },
    {
      title: "Sensitive Groups",
      icon: <AlertTriangle className="h-6 w-6" />,
      description: advice.sensitive,
      severity: advice.color,
      note: "Children, elderly, heart/lung disease patients"
    }
  ];

  const recommendationCards = [
    {
      title: "Wear Mask",
      icon: <Shield className="h-8 w-8" />,
      description: currentAQI > 100 ? "N95 mask recommended outdoors" : "Mask not necessary",
      recommended: currentAQI > 100,
      urgency: currentAQI > 200 ? "high" : currentAQI > 100 ? "medium" : "low"
    },
    {
      title: "Outdoor Exercise",
      icon: <Activity className="h-8 w-8" />,
      description: currentAQI > 150 ? "Avoid outdoor exercise" : currentAQI > 100 ? "Limit intensive activities" : "Safe for outdoor exercise",
      recommended: currentAQI <= 100,
      urgency: currentAQI > 150 ? "high" : currentAQI > 100 ? "medium" : "low"
    },
    {
      title: "Schools & Children",
      icon: <School className="h-8 w-8" />,
      description: currentAQI > 150 ? "Cancel outdoor school activities" : currentAQI > 100 ? "Monitor children closely" : "Normal school activities OK",
      recommended: currentAQI <= 150,
      urgency: currentAQI > 150 ? "high" : currentAQI > 100 ? "medium" : "low"
    },
    {
      title: "Windows & Ventilation",
      icon: <Home className="h-8 w-8" />,
      description: currentAQI > 100 ? "Keep windows closed" : "Natural ventilation is fine",
      recommended: currentAQI <= 100,
      urgency: currentAQI > 100 ? "medium" : "low"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "border-red-200 bg-red-50 dark:bg-red-950";
      case "medium": return "border-orange-200 bg-orange-50 dark:bg-orange-950";
      default: return "border-green-200 bg-green-50 dark:bg-green-950";
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high": return <Badge variant="destructive">High Priority</Badge>;
      case "medium": return <Badge variant="secondary" className="text-orange-600">Medium</Badge>;
      default: return <Badge variant="default" className="bg-green-600">Safe</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Health Impact for Different Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthGroups.map((group, index) => (
          <Card key={index} className={`border-2 ${
            advice.color === 'red' ? 'border-red-200 bg-red-50 dark:bg-red-950' :
            advice.color === 'orange' ? 'border-orange-200 bg-orange-50 dark:bg-orange-950' :
            advice.color === 'yellow' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950' :
            advice.color === 'green' ? 'border-green-200 bg-green-50 dark:bg-green-950' :
            'border-purple-200 bg-purple-50 dark:bg-purple-950'
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {group.icon}
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">{group.description}</p>
              {group.note && (
                <p className="text-xs text-muted-foreground italic">{group.note}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendation Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Health Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendationCards.map((card, index) => (
            <Card key={index} className={`${getUrgencyColor(card.urgency)} hover:shadow-lg transition-shadow`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      card.urgency === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900' :
                      card.urgency === 'medium' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900' :
                      'bg-green-100 text-green-600 dark:bg-green-900'
                    }`}>
                      {card.icon}
                    </div>
                    {card.title}
                  </CardTitle>
                  {getUrgencyBadge(card.urgency)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{card.description}</p>
                <Button 
                  size="sm" 
                  variant={card.recommended ? "default" : "outline"}
                  className="w-full"
                >
                  {card.recommended ? "Follow Recommendation" : "Advisory Only"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detailed Activities & Precautions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">✓ Recommended Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {advice.activities.map((activity, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {activity}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">⚠ Precautions to Take</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {advice.precautions.map((precaution, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  {precaution}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Information */}
      {currentAQI > 200 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                  Health Emergency Guidelines
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  Air quality has reached dangerous levels. If you experience breathing difficulties, 
                  chest pain, or severe coughing, seek medical attention immediately.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="destructive">
                    Emergency Contacts
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                    Nearest Hospital
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                    Air Quality Helpline
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthAdvisory;
