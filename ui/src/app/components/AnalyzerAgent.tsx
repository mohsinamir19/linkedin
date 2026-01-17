import { useState } from "react";
import { ChatInterface, Message } from "./ChatInterface";
import { KPICard } from "./KPICard";
import { PostPerformanceChart } from "./PostPerformanceChart";
import { ContentBreakdown } from "./ContentBreakdown";
import { AIInsights } from "./AIInsights";
import { Activity, TrendingUp, TrendingDown, Target, PenTool, Zap, RefreshCw, AlertCircle } from "lucide-react";
import { sendAnalyticsMessage } from "@/lib/api";

export function AnalyzerAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your LinkedIn Analytics Agent. I can help you understand your post performance, identify trends, and provide actionable insights. What would you like to know about your LinkedIn analytics?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>(`analytics-${Date.now()}`);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setApiError(null);

    // Call the real API
    setIsTyping(true);
    try {
      const response = await sendAnalyticsMessage(message, sessionId);
      
      // Update session ID if changed
      if (response.session_id) {
        setSessionId(response.session_id);
      }

      // Extract the response content
      let responseContent = "";
      if (response.response.status === "completed" && response.response.decision?.insight) {
        responseContent = response.response.decision.insight;
      } else if (response.response.reply) {
        responseContent = response.response.reply;
      } else if (typeof response.response === 'string') {
        responseContent = response.response;
      } else {
        responseContent = JSON.stringify(response.response, null, 2);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to connect to the server";
      setApiError(errorMessage);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `⚠️ I'm having trouble connecting to the analytics server. Please check that your backend is running.\n\nError: ${errorMessage}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* API Error Banner */}
      {apiError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-900">Connection Error</p>
            <p className="text-sm text-red-700 mt-1">
              Unable to connect to the backend API. Make sure your FastAPI server is running on the correct port.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Chat Interface */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Analyzer Agent</h2>
              <p className="text-sm text-gray-600 mt-1">AI-powered insights for your LinkedIn performance</p>
            </div>
          </div>

          <div className="h-[calc(100vh-220px)] min-h-[500px]">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
              placeholder="Ask about your performance, best times, content strategy..."
              emptyStateTitle="Your Analytics Assistant"
              emptyStateDescription="Ask me anything about your LinkedIn performance and I'll provide detailed insights and recommendations."
            />
          </div>
        </div>

        {/* Right Panel - Dashboard */}
        <div className="space-y-6">
          {/* Data Source Indicator */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Live Data</p>
                  <p className="text-xs text-gray-600">
                    Last synced: <span className="font-semibold">2 hours ago</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-700 font-semibold">Connected</span>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-3">
            <KPICard
              title="Avg. Engagement"
              value="4.8%"
              change={12}
              trend="up"
              icon={<Activity className="w-4 h-4 text-blue-600" />}
              comparison="vs. last 30d"
            />
            <KPICard
              title="Best Post"
              value="287"
              label="engagements"
              change={45}
              trend="up"
              icon={<TrendingUp className="w-4 h-4 text-green-600" />}
              comparison="last 30d"
            />
            <KPICard
              title="Optimal Time"
              value="Tue 9AM"
              icon={<Target className="w-4 h-4 text-purple-600" />}
              comparison="peak engagement"
              hideTrend
            />
            <KPICard
              title="Post Velocity"
              value="3.2"
              label="posts/week"
              change={8}
              trend="up"
              icon={<Zap className="w-4 h-4 text-yellow-600" />}
              comparison="vs. last month"
            />
          </div>

          {/* Performance Chart */}
          <PostPerformanceChart />

          {/* Content Breakdown & AI Insights */}
          <div className="grid grid-cols-1 gap-4">
            <ContentBreakdown />
            <AIInsights />
          </div>
        </div>
      </div>
    </div>
  );
}