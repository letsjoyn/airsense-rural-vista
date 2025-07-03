
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBotUI from "./ChatBotUI";

interface MainLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const MainLayout = ({ children, onLogout }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-premium-gradient text-foreground">
      <Navbar onLogout={onLogout} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatBotUI />
    </div>
  );
};

export default MainLayout;
