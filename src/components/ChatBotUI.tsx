
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, X, Bot, Sparkles, TrendingUp, HelpCircle, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
}

const ChatBotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm TarkBot, your intelligent air quality assistant. I can help you understand AQI data, provide health advice, and explain air pollution trends. How can I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What's the AQI in my city right now?",
    "Why is PM2.5 dangerous?",
    "Show me the AQI trend for the past week",
    "How can I reduce indoor air pollution?",
    "Explain pollutants like NO2, CO, and O3"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response with typing animation
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);

    setInputMessage("");
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputMessage(prompt);
    setTimeout(() => handleSendMessage(), 100);
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("aqi") || lowerMessage.includes("air quality")) {
      return "📊 The current AQI in your area is 89 (Moderate). This means air quality is acceptable for most people, but sensitive individuals may experience minor issues. PM2.5 levels are at 35 μg/m³. Would you like detailed pollutant breakdowns?";
    } else if (lowerMessage.includes("pm2.5") || lowerMessage.includes("dangerous")) {
      return "⚠️ PM2.5 particles are extremely dangerous because they're small enough (2.5 micrometers) to penetrate deep into your lungs and bloodstream. They can cause respiratory issues, heart disease, and premature death. Current safe limit is 15 μg/m³ annually.";
    } else if (lowerMessage.includes("trend") || lowerMessage.includes("week")) {
      return "📈 Here's your 7-day AQI trend: Mon(95) → Tue(87) → Wed(92) → Thu(89) → Fri(94) → Sat(88) → Today(89). Overall stable with slight improvement mid-week. Peak pollution typically occurs during morning rush hours.";
    } else if (lowerMessage.includes("reduce") || lowerMessage.includes("indoor")) {
      return "🏠 To reduce indoor air pollution: 1) Use air purifiers with HEPA filters, 2) Keep windows closed during high AQI periods, 3) Add indoor plants like spider plants or peace lilies, 4) Avoid smoking indoors, 5) Use exhaust fans while cooking. Want specific product recommendations?";
    } else if (lowerMessage.includes("no2") || lowerMessage.includes("co") || lowerMessage.includes("o3")) {
      return "🧪 Pollutant Guide:\n• NO2 (Nitrogen Dioxide): From vehicles/industry, causes respiratory irritation\n• CO (Carbon Monoxide): Colorless, odorless gas from combustion, reduces oxygen in blood\n• O3 (Ozone): Ground-level ozone from vehicle emissions + sunlight, triggers asthma\n\nCurrent levels: NO2: 45 μg/m³, CO: 2.1 mg/m³, O3: 87 μg/m³";
    } else {
      return "🤖 I'm TarkBot, your AI air quality expert! I can help with:\n• Real-time AQI data & forecasts\n• Health recommendations\n• Pollutant explanations\n• Indoor air quality tips\n• Trend analysis\n\nTry asking about specific pollutants, health effects, or your city's air quality!";
    }
  };

  return (
    <>
      {/* Enhanced Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <motion.div
          className="relative"
          animate={!isOpen ? { 
            y: [0, -5, 0],
          } : {}}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="lg"
            className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group animate-pulse-ring"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="h-7 w-7 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Bot className="h-7 w-7 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-2 w-2 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
        
        {/* Enhanced Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none shadow-xl border border-blue-500/20"
            >
              💬 Need help? Chat with TarkBot!
              <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-slate-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[32rem]"
          >
            <Card className="h-full flex flex-col bg-slate-900/95 backdrop-blur-md shadow-2xl border border-blue-500/20 rounded-2xl">
              <CardHeader className="pb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6" />
                    <span className="font-semibold">TarkBot</span>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs opacity-90">Online</span>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Suggested Prompts */}
                {messages.length === 1 && (
                  <div className="p-4 border-b border-slate-700 bg-slate-800/50">
                    <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Try asking me:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestedPrompts.slice(0, 3).map((prompt, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors text-xs border-blue-500/30 text-blue-300 hover:border-blue-500"
                          onClick={() => handleSuggestedPrompt(prompt)}
                        >
                          {prompt}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                            message.sender === "user"
                              ? "bg-blue-600 text-white rounded-br-md"
                              : "bg-slate-800 text-slate-100 rounded-bl-md border border-slate-700"
                          }`}
                        >
                          {message.text}
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[85%] p-3 rounded-2xl rounded-bl-md bg-slate-800 border border-slate-700">
                          <div className="flex items-center gap-2 text-slate-400">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-xs">TarkBot is typing...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t border-slate-700 bg-slate-800/30">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask about air quality, health tips..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 bg-slate-900 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 rounded-xl"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-blue-600 hover:bg-blue-700 shrink-0 rounded-xl"
                      disabled={!inputMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBotUI;
