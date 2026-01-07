import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartLine } from "lucide-react";
import { useState } from "react";

const mockData = [
  { date: "Dec 13", likes: 45, comments: 12, reposts: 5, impressions: 1200, engagement: 5.2 },
  { date: "Dec 14", likes: 67, comments: 18, reposts: 8, impressions: 1450, engagement: 6.4 },
  { date: "Dec 15", likes: 34, comments: 8, reposts: 3, impressions: 980, engagement: 4.6 },
  { date: "Dec 16", likes: 89, comments: 24, reposts: 12, impressions: 1820, engagement: 6.9 },
  { date: "Dec 17", likes: 56, comments: 15, reposts: 7, impressions: 1340, engagement: 5.8 },
  { date: "Dec 18", likes: 102, comments: 31, reposts: 15, impressions: 2100, engagement: 7.0 },
  { date: "Dec 19", likes: 78, comments: 21, reposts: 10, impressions: 1650, engagement: 6.6 },
];

export function PostPerformanceChart() {
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ChartLine className="w-5 h-5 text-gray-600" />
          <h2 className="font-semibold text-gray-900">Post Performance Trends</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              chartType === "line"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              chartType === "bar"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="likes" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="comments" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="reposts" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          ) : (
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="likes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="comments" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reposts" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-semibold text-gray-900">471</p>
            <p className="text-sm text-gray-600 mt-1">Total Likes</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">129</p>
            <p className="text-sm text-gray-600 mt-1">Total Comments</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">60</p>
            <p className="text-sm text-gray-600 mt-1">Total Reposts</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">10.5K</p>
            <p className="text-sm text-gray-600 mt-1">Total Impressions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
