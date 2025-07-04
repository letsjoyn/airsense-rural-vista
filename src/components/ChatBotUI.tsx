
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, X, Bot, Sparkles, MapPin, Activity, HelpCircle, Lightbulb, Clock, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
  messageType?: "text" | "location" | "health-advice" | "pollutant-info";
}

const ChatBotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm TarkBot, your personal air quality assistant. I can help you with:\n\n🌍 Real-time AQI data for your location\n💊 Personalized health recommendations\n🧪 Pollutant explanations\n📊 Air quality trends\n\nHow can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      messageType: "text"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: <MapPin className="h-4 w-4" />, text: "Get my location AQI", action: "location" },
    { icon: <Activity className="h-4 w-4" />, text: "Health recommendations", action: "health" },
    { icon: <HelpCircle className="h-4 w-4" />, text: "Explain pollutants", action: "pollutants" },
    { icon: <Clock className="h-4 w-4" />, text: "Weekly trends", action: "trends" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate API call delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        messageType: getBotMessageType(inputMessage)
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);

    setInputMessage("");
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      location: "What's the current AQI in my location?",
      health: "Give me health advice for current air quality",
      pollutants: "Explain the main air pollutants",
      trends: "Show me air quality trends for this week"
    };
    
    setInputMessage(actionMessages[action as keyof typeof actionMessages]);
    setTimeout(() => handleSendMessage(), 100);
  };

  const getBotMessageType = (message: string): "text" | "location" | "health-advice" | "pollutant-info" => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("location") || lowerMessage.includes("aqi")) return "location";
    if (lowerMessage.includes("health") || lowerMessage.includes("advice")) return "health-advice";
    if (lowerMessage.includes("pollutant") || lowerMessage.includes("explain")) return "pollutant-info";
    return "text";
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("location") || lowerMessage.includes("my") && lowerMessage.includes("aqi")) {
      return "📍 Based on your location (New Delhi), here's the current air quality:\n\n🔴 AQI: 156 (Unhealthy)\n• PM2.5: 89 μg/m³ (High)\n• PM10: 145 μg/m³ (High)\n• NO2: 67 μg/m³ (Moderate)\n• O3: 45 μg/m³ (Good)\n• CO: 2.3 mg/m³ (Moderate)\n\n⚠️ Recommendation: Limit outdoor activities and use air purifiers indoors.";
    } else if (lowerMessage.includes("health") || lowerMessage.includes("advice")) {
      return "💊 **Personalized Health Advisory** (AQI: 156)\n\n**Immediate Actions:**\n• Wear N95/P2 masks outdoors\n• Keep windows closed\n• Use air purifiers with HEPA filters\n• Avoid outdoor exercise\n\n**Sensitive Groups:** Children, elderly, and people with respiratory conditions should stay indoors.\n\n**Hydration:** Drink plenty of water and consider immunity-boosting foods.";
    } else if (lowerMessage.includes("pollutant") || lowerMessage.includes("explain")) {
      return "🧪 **Major Air Pollutants Explained:**\n\n**PM2.5** - Tiny particles that penetrate deep into lungs\n**PM10** - Larger particles causing respiratory irritation\n**NO2** - From vehicles, causes lung inflammation\n**O3** - Ground-level ozone, triggers asthma\n**CO** - Colorless gas reducing oxygen in blood\n**SO2** - From industries, causes breathing difficulties\n\nWould you like detailed info about any specific pollutant?";
    } else if (lowerMessage.includes("trend") || lowerMessage.includes("week")) {
      return "📊 **7-Day AQI Trend for New Delhi:**\n\nMon: 142 (Unhealthy) 📈\nTue: 134 (Unhealthy) 📉\nWed: 156 (Unhealthy) 📈\nThu: 149 (Unhealthy) 📉\nFri: 163 (Unhealthy) 📈\nSat: 158 (Unhealthy) 📉\nToday: 156 (Unhealthy) 📉\n\n**Pattern:** Generally unhealthy with slight weekend improvement. Peak pollution during weekday rush hours.";
    } else {
      return "🤖 I'm here to help with air quality information! Try asking me about:\n\n• Current AQI in your area\n• Health recommendations\n• Pollutant explanations\n• Air quality forecasts\n• Indoor air improvement tips\n\nWhat would you like to know?";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: 'numeric', 
      minute: '2-digit' 
    });
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
            y: [0, -8, 0],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="lg"
            className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
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
                    animate={{ scale: [1, 1.3, 1] }}
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
              className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap pointer-events-none shadow-xl border border-blue-500/20"
            >
              💬 Need help? Chat with TarkBot!
              <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-6 border-l-gray-900 border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* WhatsApp-style Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[36rem]"
          >
            <Card className="h-full flex flex-col bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              {/* WhatsApp-style Header */}
              <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center">
                        <Bot className="h-6 w-6" />
                      </div>
                      <motion.div
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <div className="font-semibold">TarkBot</div>
                      <div className="text-xs opacity-90 font-normal">AI Air Quality Assistant</div>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0 bg-gray-50 dark:bg-gray-800">
                {/* Quick Actions */}
                {messages.length === 1 && (
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Quick Actions:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="justify-start h-auto p-3 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          onClick={() => handleQuickAction(action.action)}
                        >
                          {action.icon}
                          <span className="ml-2">{action.text}</span>
                        </Button>
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
                        <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                          <div
                            className={`p-3 rounded-2xl text-sm relative ${
                              message.sender === "user"
                                ? "bg-blue-600 text-white rounded-br-md ml-2"
                                : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md mr-2 shadow-sm border border-gray-200 dark:border-gray-600"
                            }`}
                          >
                            <div className="whitespace-pre-wrap">{message.text}</div>
                            <div className={`flex items-center justify-end mt-1 gap-1 text-xs ${
                              message.sender === "user" 
                                ? "text-blue-100" 
                                : "text-gray-500 dark:text-gray-400"
                            }`}>
                              <span>{formatTime(message.timestamp)}</span>
                              {message.sender === "user" && (
                                <CheckCheck className="h-3 w-3" />
                              )}
                            </div>
                          </div>
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
                        <div className="max-w-[80%] mr-2">
                          <div className="p-3 rounded-2xl rounded-bl-md bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                              <span className="text-xs">TarkBot is typing...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                {/* WhatsApp-style Input */}
                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2 items-end">
                    <div className="flex-1 relative">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your question about air quality..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="rounded-full border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 pr-12"
                        disabled={isTyping}
                      />
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-blue-600 hover:bg-blue-700 shrink-0 rounded-full w-10 h-10 transition-all duration-200 hover:scale-105"
                      disabled={!inputMessage.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
                    Powered by TarkVayu AI • Real-time air quality data
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
