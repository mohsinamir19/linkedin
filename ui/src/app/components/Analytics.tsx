import { TrendingUp, TrendingDown, Target, Zap, PenTool, Activity, RefreshCw } from "lucide-react";
import { KPICard } from "./KPICard";
import { PostPerformanceChart } from "./PostPerformanceChart";
import { ContentBreakdown } from "./ContentBreakdown";
import { AIInsights } from "./AIInsights";

export function Analytics() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">AI-powered insights to improve your LinkedIn content strategy</p>
      </div>

      {/* Data Source Indicator */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Data Source & Freshness</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Last synced: <span className="font-semibold">2 hours ago</span> from LinkedIn Analytics
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700 font-semibold">Auto-scraped</span>
            </div>
            <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              Sync Now
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <KPICard
          title="Average Engagement Rate"
          value="4.8%"
          change={12}
          trend="up"
          icon={<Activity className="w-5 h-5 text-blue-600" />}
          comparison="vs. last 30 days"
        />
        <KPICard
          title="Best Performing Post"
          value="45"
          label="engagements"
          change={45}
          trend="up"
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          comparison="last 30 days"
        />
        <KPICard
          title="Worst Performing Post"
          value="23"
          label="engagements"
          change={-18}
          trend="down"
          icon={<TrendingDown className="w-5 h-5 text-orange-600" />}
          comparison="vs. average"
        />
        <KPICard
          title="Best Posting Time"
          value="Tue 9AM"
          label="optimal time"
          icon={<Target className="w-5 h-5 text-purple-600" />}
          comparison="based on analysis"
          hideTrend
        />
        <KPICard
          title="Detected Writing Style"
          value="Professional"
          label="with storytelling"
          icon={<PenTool className="w-5 h-5 text-indigo-600" />}
          comparison="your signature"
          hideTrend
        />
        <KPICard
          title="Content Velocity"
          value="3.2"
          label="posts/week"
          change={8}
          trend="up"
          icon={<Zap className="w-5 h-5 text-yellow-600" />}
          comparison="vs. last month"
        />
      </div>

      {/* Post Performance Chart */}
      <PostPerformanceChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Content Breakdown */}
        <ContentBreakdown />

        {/* AI Insights */}
        <AIInsights />
      </div>
    </div>
  );
}