
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Bell, MapPin, Clock, Shield, Smartphone, Mail, Settings as SettingsIcon } from "lucide-react";
import { toast } from "sonner";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    pollutionSpikes: true,
    healthTips: true,
    nightAlerts: false,
    forecastUpdates: true,
    emergencyAlerts: true,
    email: true,
    push: true,
    sms: false,
    alertThreshold: "moderate",
    quietHours: { start: "22:00", end: "06:00" },
    location: "auto"
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    toast.success("Notification settings saved successfully!");
  };

  const alertThresholds = [
    { value: "good", label: "Good (0-50)", description: "Get alerts even for good air quality changes" },
    { value: "moderate", label: "Moderate (51-100)", description: "Alert when air quality becomes moderate or worse" },
    { value: "poor", label: "Poor (101-200)", description: "Alert only when air quality is poor or worse" },
    { value: "very-poor", label: "Very Poor (201-300)", description: "Alert only for very poor or hazardous conditions" }
  ];

  return (
    <div className="space-y-6">
      {/* Notification Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Types
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Pollution Spike Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when air quality suddenly worsens in your area
              </p>
            </div>
            <Switch
              checked={settings.pollutionSpikes}
              onCheckedChange={() => handleToggle('pollutionSpikes')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Location-based Health Tips</Label>
              <p className="text-sm text-muted-foreground">
                Receive personalized health recommendations based on your location's air quality
              </p>
            </div>
            <Switch
              checked={settings.healthTips}
              onCheckedChange={() => handleToggle('healthTips')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Night Alerts (10 PM - 6 AM)</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications during night hours for emergency conditions only
              </p>
            </div>
            <Switch
              checked={settings.nightAlerts}
              onCheckedChange={() => handleToggle('nightAlerts')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Forecast Updates</Label>
              <p className="text-sm text-muted-foreground">
                Daily air quality forecasts and weather-related air quality changes
              </p>
            </div>
            <Switch
              checked={settings.forecastUpdates}
              onCheckedChange={() => handleToggle('forecastUpdates')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Emergency Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Critical health warnings for hazardous air quality conditions
              </p>
              <Badge variant="destructive" className="text-xs">Cannot be disabled</Badge>
            </div>
            <Switch
              checked={settings.emergencyAlerts}
              onCheckedChange={() => handleToggle('emergencyAlerts')}
              disabled
            />
          </div>
        </CardContent>
      </Card>

      {/* Delivery Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Delivery Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Instant notifications on your device
              </p>
            </div>
            <Switch
              checked={settings.push}
              onCheckedChange={() => handleToggle('push')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Daily summaries and important alerts via email
              </p>
            </div>
            <Switch
              checked={settings.email}
              onCheckedChange={() => handleToggle('email')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                SMS Alerts
              </Label>
              <p className="text-sm text-muted-foreground">
                Emergency alerts via text message
              </p>
            </div>
            <Switch
              checked={settings.sms}
              onCheckedChange={() => handleToggle('sms')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Alert Threshold */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Alert Threshold
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-base font-medium">Minimum AQI Level for Alerts</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Choose when you want to receive air quality alerts
            </p>
            <Select value={settings.alertThreshold} onValueChange={(value) => setSettings(prev => ({ ...prev, alertThreshold: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {alertThresholds.map((threshold) => (
                  <SelectItem key={threshold.value} value={threshold.value}>
                    <div>
                      <div className="font-medium">{threshold.label}</div>
                      <div className="text-xs text-muted-foreground">{threshold.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Quiet Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Set times when you don't want to receive non-emergency notifications
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Time</Label>
              <Input
                type="time"
                value={settings.quietHours.start}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  quietHours: { ...prev.quietHours, start: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label>End Time</Label>
              <Input
                type="time"
                value={settings.quietHours.end}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  quietHours: { ...prev.quietHours, end: e.target.value }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-base font-medium">Location for Alerts</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Choose how we determine your location for personalized alerts
            </p>
            <Select value={settings.location} onValueChange={(value) => setSettings(prev => ({ ...prev, location: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect location</SelectItem>
                <SelectItem value="manual">Set manual location</SelectItem>
                <SelectItem value="multiple">Multiple locations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <SettingsIcon className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      {/* Firebase Integration Placeholder */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Bell className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Push Notification Setup
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                To receive push notifications, we need to set up Firebase Cloud Messaging. 
                This feature will be integrated with your browser's notification system.
              </p>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                Enable Browser Notifications
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
