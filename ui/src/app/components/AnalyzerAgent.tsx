import { useState } from "react";
import { ChatInterface, Message } from "./ChatInterface";
import { KPICard } from "./KPICard";
import { PostPerformanceChart } from "./PostPerformanceChart";
import { ContentBreakdown } from "./ContentBreakdown";
import { AIInsights } from "./AIInsights";
import { Activity, TrendingUp, TrendingDown, Target, PenTool, Zap, RefreshCw } from "lucide-react";

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

  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      let response = "";

      if (message.toLowerCase().includes("best time") || message.toLowerCase().includes("when")) {
        response = `Based on your last 30 days of data, here are your optimal posting times:

🏆 Best Time: Tuesday at 9:00 AM
- Average engagement: 287 interactions
- 45% higher than your overall average

📊 Other strong time slots:
• Wednesday 2:00 PM - 223 avg interactions
• Thursday 10:00 AM - 198 avg interactions
• Friday 8:30 AM - 176 avg interactions

💡 Insight: Your audience is most active on weekday mornings, especially mid-week. Try posting educational or thought-leadership content during these windows.`;
      } else if (message.toLowerCase().includes("engagement") || message.toLowerCase().includes("performance")) {
        response = `Here's your engagement overview:

📈 Current Metrics:
• Average engagement rate: 4.8% (↑12% vs last month)
• Total impressions: 12,450
• Profile visits: 234 (↑18%)

🎯 Top Performing Content:
Your posts with storytelling and personal experiences get 65% more engagement than pure industry updates.

💡 Recommendations:
1. Continue mixing professional insights with personal stories
2. Use 3-5 hashtags per post (sweet spot for your audience)
3. Posts with images get 2.3x more engagement than text-only

Want me to dive deeper into any specific metric?`;
      } else if (message.toLowerCase().includes("improve") || message.toLowerCase().includes("better")) {
        response = `Here are AI-powered recommendations to boost your LinkedIn performance:

🚀 Content Strategy:
1. **Hook Optimization**: 78% of your top posts start with a question or bold statement. Use this pattern more consistently.

2. **Optimal Length**: Your best-performing posts are 150-200 words. Shorter posts (< 100 words) underperform by 34%.

3. **Visual Content**: Posts with images get 2.3x engagement. Consider adding visuals to every post.

4. **Hashtag Strategy**: Use 3-5 hashtags. You're currently using 2-3, missing potential reach.

5. **CTA Effectiveness**: Posts ending with "What's your experience?" get 56% more comments than generic CTAs.

📊 Posting Schedule:
- Increase Tuesday/Wednesday posts (your peak days)
- Reduce weekend posting (40% lower engagement)

Would you like specific examples for any of these strategies?`;
      } else {
        response = `I can help you with:

📊 **Performance Analysis**: Understanding your engagement, reach, and growth metrics
⏰ **Timing Optimization**: Finding your best posting times
🎯 **Content Strategy**: Identifying what content resonates with your audience
📈 **Trend Analysis**: Spotting patterns in your top and bottom performing posts
💡 **Actionable Insights**: Specific recommendations to improve your LinkedIn presence

What aspect would you like to explore first?`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1800);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
