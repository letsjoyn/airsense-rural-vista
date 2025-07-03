
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, X, Minimize2 } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm AirBot, your personal air quality assistant. I can help you with AQI information, health recommendations, and answer questions about air pollution. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickActions = [
    "What's my current AQI?",
    "Is it safe to exercise outside?",
    "Health tips for poor air quality",
    "What causes air pollution?",
    "How to protect from pollution?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage("");
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("aqi") || input.includes("air quality")) {
      return "The current AQI in your area is 156 (Poor). This means you should limit prolonged outdoor activities and consider wearing a mask when going outside. Would you like specific health recommendations?";
    } else if (input.includes("exercise") || input.includes("workout")) {
      return "With the current AQI of 156 (Poor), I'd recommend avoiding intensive outdoor exercise. Instead, try indoor activities or wait for better air quality. Light walking with a mask is okay for short periods.";
    } else if (input.includes("health") || input.includes("tips")) {
      return "Here are some health tips for current air quality: 1) Keep windows closed 2) Use air purifier if available 3) Wear N95 mask outdoors 4) Stay hydrated 5) Avoid outdoor exercise. Would you like more specific advice?";
    } else if (input.includes("cause") || input.includes("pollution")) {
      return "Air pollution is caused by various factors: vehicle emissions, industrial activities, construction dust, crop burning, and weather conditions. In urban areas, traffic is often the biggest contributor. Would you like to know about pollution sources in your area?";
    } else if (input.includes("protect")) {
      return "To protect yourself from air pollution: Use air purifiers indoors, wear proper masks (N95/N99) outdoors, avoid peak traffic hours, keep indoor plants, monitor AQI regularly, and limit outdoor activities during high pollution days.";
    } else {
      return "I understand you're asking about air quality. I can help you with current AQI levels, health recommendations, pollution sources, and protective measures. Could you please be more specific about what you'd like to know?";
    }
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Interface */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:w-96 p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AirBot</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm opacity-90">Online</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-emerald-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t">
              <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action)}
                    className="text-xs h-8"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about air quality..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by AI • Ready to connect to OpenAI GPT
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ChatBotUI;
