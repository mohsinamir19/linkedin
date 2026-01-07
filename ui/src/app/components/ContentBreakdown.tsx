import { Hash, Smile, Target, PenTool } from "lucide-react";

const contentMetrics = [
  {
    label: "Hook Type",
    value: "Question",
    icon: <Target className="w-4 h-4 text-purple-600" />,
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    label: "Tone",
    value: "Professional",
    icon: <PenTool className="w-4 h-4 text-blue-600" />,
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    label: "Post Length",
    value: "Medium (500-800)",
    icon: <Hash className="w-4 h-4 text-green-600" />,
    color: "bg-green-50 border-green-200 text-green-700",
  },
  {
    label: "CTA Present",
    value: "Yes",
    icon: <Target className="w-4 h-4 text-orange-600" />,
    color: "bg-orange-50 border-orange-200 text-orange-700",
  },
  {
    label: "Hashtags",
    value: "4-5 tags",
    icon: <Hash className="w-4 h-4 text-indigo-600" />,
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
  },
  {
    label: "Emoji Density",
    value: "Moderate",
    icon: <Smile className="w-4 h-4 text-yellow-600" />,
    color: "bg-yellow-50 border-yellow-200 text-yellow-700",
  },
];

const hookTypes = [
  { type: "Question", count: 12, percentage: 35 },
  { type: "Bold Claim", count: 8, percentage: 24 },
  { type: "Story", count: 7, percentage: 21 },
  { type: "Stat/Number", count: 5, percentage: 15 },
  { type: "Other", count: 2, percentage: 5 },
];

export function ContentBreakdown() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <PenTool className="w-5 h-5 text-gray-600" />
        <h2 className="font-semibold text-gray-900">AI Content Breakdown</h2>
      </div>

      {/* Content Metrics Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {contentMetrics.map((metric, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${metric.color}`}
          >
            {metric.icon}
            <div className="text-sm">
              <span className="opacity-75">{metric.label}:</span>{" "}
              <span className="font-semibold">{metric.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hook Type Distribution */}
      <div className="border-t border-gray-200 pt-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Hook Type Distribution</h3>
        <div className="space-y-3">
          {hookTypes.map((hook, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-700">{hook.type}</span>
                <span className="text-sm text-gray-600 font-semibold">{hook.count} posts ({hook.percentage}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                  style={{ width: `${hook.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Performers */}
      <div className="border-t border-gray-200 pt-5 mt-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Best Performing Patterns</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-green-900">
              <span className="font-semibold">Questions</span> get 22% more engagement
            </p>
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Medium length</span> posts (500-800 chars) perform best
            </p>
          </div>
          <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <p className="text-sm text-purple-900">
              <span className="font-semibold">4-5 hashtags</span> is the sweet spot
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
