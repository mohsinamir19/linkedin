import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  label?: string;
  change?: number;
  trend?: "up" | "down";
  icon: React.ReactNode;
  comparison: string;
  hideTrend?: boolean;
}

export function KPICard({ title, value, label, change, trend, icon, comparison, hideTrend }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">
          {icon}
        </div>
        {!hideTrend && change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            trend === "up" ? "text-green-600" : "text-orange-600"
          }`}>
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-gray-600">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {label && <span className="text-sm text-gray-500">{label}</span>}
        </div>
        <p className="text-xs text-gray-500">{comparison}</p>
      </div>
    </div>
  );
}
