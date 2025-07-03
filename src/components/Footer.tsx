
import { Wind, Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Wind className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                AirSense
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Granular, Real-Time & Predictive Air Quality Information for Every Indian. 
              Focusing on underserved rural and small-town regions.
            </p>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-emerald-600 transition-colors">Dashboard</Link></li>
              <li><Link to="/forecast" className="text-muted-foreground hover:text-emerald-600 transition-colors">Forecast</Link></li>
              <li><Link to="/health" className="text-muted-foreground hover:text-emerald-600 transition-colors">Health Advisory</Link></li>
              <li><Link to="/trends" className="text-muted-foreground hover:text-emerald-600 transition-colors">Historical Data</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors">Help Center</span></li>
              <li><span className="text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors">API Documentation</span></li>
              <li><span className="text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors">Contact Us</span></li>
              <li><span className="text-muted-foreground hover:text-emerald-600 cursor-pointer transition-colors">Privacy Policy</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 AirSense. Made with ❤️ for cleaner air in India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
