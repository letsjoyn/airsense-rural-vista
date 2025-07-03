
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import HealthAdvisory from "../components/HealthAdvisory";

const Health = () => {
  const currentAQI = 156;
  const currentLevel = "Poor";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Health & Advisory Dashboard</h1>
        <p className="text-muted-foreground">
          Personalized health recommendations based on current air quality
        </p>
      </div>

      {/* Current Status */}
      <Card className="mb-8 border-2 border-orange-200">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              <Badge variant="secondary" className="text-orange-600 text-lg px-4 py-2">
                {currentLevel} Air Quality
              </Badge>
            </div>
            <div className="text-6xl font-bold mb-2">{currentAQI}</div>
            <p className="text-xl text-muted-foreground mb-6">Current AQI Level</p>
            
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span>Good</span>
                <span>Hazardous</span>
              </div>
              <Progress value={(currentAQI / 500) * 100} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      <HealthAdvisory currentAQI={currentAQI} currentLevel={currentLevel} />
    </div>
  );
};

export default Health;
