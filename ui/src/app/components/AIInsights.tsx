import { Sparkles, TrendingUp, Clock, Users, Target, Zap } from "lucide-react";

const insights = [
  {
    icon: <TrendingUp className="w-5 h-5 text-green-600" />,
    title: "Questions Drive Engagement",
    what: "Posts with questions get 22% more engagement",
    why: "Your audience prefers interactive content that invites participation",
    action: "Start more posts with thought-provoking questions",
    type: "success",
  },
  {
    icon: <Clock className="w-5 h-5 text-blue-600" />,
    title: "Optimal Posting Time",
    what: "Your best engagement happens on Tuesday mornings",
    why: "Your audience is most active between 9-11 AM on weekdays",
    action: "Schedule important posts for Tuesday at 9:00 AM",
    type: "info",
  },
  {
    icon: <Users className="w-5 h-5 text-purple-600" />,
    title: "Story-Based Content Wins",
    what: "Personal stories get 18% higher engagement than pure advice",
    why: "Authenticity resonates with your professional audience",
    action: "Share more personal experiences and case studies",
    type: "success",
  },
  {
    icon: <Target className="w-5 h-5 text-orange-600" />,
    title: "CTA Impact",
    what: "Posts without CTAs get 40% fewer comments",
    why: "People need explicit invitations to engage",
    action: "Always end with a question or call-to-action",
    type: "warning",
  },
];

export function AIInsights() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h2 className="font-semibold text-gray-900">AI Insights & Recommendations</h2>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              insight.type === "success"
                ? "bg-green-50 border-green-500"
                : insight.type === "warning"
                ? "bg-orange-50 border-orange-500"
                : "bg-blue-50 border-blue-500"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                insight.type === "success"
                  ? "bg-green-100"
                  : insight.type === "warning"
                  ? "bg-orange-100"
                  : "bg-blue-100"
              }`}>
                {insight.icon}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm">{insight.title}</h3>
                
                <div className="space-y-1.5 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">What:</span>{" "}
                    <span className="text-gray-600">{insight.what}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Why:</span>{" "}
                    <span className="text-gray-600">{insight.why}</span>
                  </div>
                  <div className={`flex items-start gap-2 pt-2 ${
                    insight.type === "success"
                      ? "text-green-800"
                      : insight.type === "warning"
                      ? "text-orange-800"
                      : "text-blue-800"
                  }`}>
                    <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Next step:</span>{" "}
                      <span>{insight.action}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="mt-5 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">Your Content Strategy</h4>
            <p className="text-sm text-gray-700">
              Based on your data, focus on <span className="font-semibold">question-based posts</span> with{" "}
              <span className="font-semibold">personal stories</span>, posted on{" "}
              <span className="font-semibold">Tuesday mornings</span>. This combination has shown{" "}
              <span className="font-semibold text-green-700">45% higher engagement</span> than your average.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
