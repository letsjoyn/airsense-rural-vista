
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950">
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
