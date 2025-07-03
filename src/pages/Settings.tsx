
import NotificationSettings from "../components/NotificationSettings";

const Settings = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your notifications and preferences
        </p>
      </div>

      <NotificationSettings />
    </div>
  );
};

export default Settings;
