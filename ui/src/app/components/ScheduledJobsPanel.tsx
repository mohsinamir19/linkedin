import { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle2, AlertCircle, Trash2, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { getScheduledJobs } from "@/lib/api";

// Define the ScheduledJob type to match your JSON
interface ScheduledJob {
  status: string;
  mode: string;
  caption: string;
  file_path: string;
  run_at: string;
}

export function ScheduledJobsPanel() {
  const [jobs, setJobs] = useState<ScheduledJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getScheduledJobs();

      // Make sure we access the array correctly
      if (response.jobs && Array.isArray(response.jobs)) {
        setJobs(response.jobs);
      } else {
        setJobs([]);
        console.warn("Unexpected response format:", response);
      }

      setLastFetch(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load scheduled jobs";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Format the run_at datetime
  const formatDateTime = (dateTimeString: string) => {
    try {
      const date = new Date(dateTimeString);
      const now = new Date();
      const diffMs = date.getTime() - now.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      let relative = '';
      if (diffMs < 0) relative = 'Past';
      else if (diffDays > 0) relative = `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
      else if (diffHours > 0) relative = `In ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
      else if (diffMins > 0) relative = `In ${diffMins} min${diffMins > 1 ? 's' : ''}`;
      else relative = 'Very soon';

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        relative,
        isPast: diffMs < 0,
      };
    } catch {
      return { date: dateTimeString, time: '', relative: '', isPast: false };
    }
  };

  const getStatusBadge = (status?: string, runAt?: string) => {
    if (!status) status = 'pending';

    if (runAt) {
      const { isPast } = formatDateTime(runAt);
      if (isPast && status === 'pending') status = 'posted';
    }

    switch (status.toLowerCase()) {
      case 'posted':
      case 'success':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Posted
          </Badge>
        );
      case 'pending':
      case 'schedule':
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Clock className="w-3 h-3 mr-1" /> Scheduled
          </Badge>
        );
      case 'failed':
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" /> Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Scheduled Posts</h3>
            <p className="text-sm text-gray-600">
              {jobs.length === 0 ? 'No scheduled posts' : `${jobs.length} post${jobs.length !== 1 ? 's' : ''} scheduled`}
            </p>
            {lastFetch && (
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {lastFetch.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </p>
            )}
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={fetchJobs} disabled={isLoading} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-yellow-50 border-b border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-yellow-900">Cannot connect to backend</p>
              <p className="text-sm text-yellow-800 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && jobs.length === 0 && (
        <div className="p-12 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
          <p className="text-sm text-gray-600">Loading scheduled posts...</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && jobs.length === 0 && !error && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">No scheduled posts yet</h4>
          <p className="text-sm text-gray-600 max-w-sm mx-auto">
            Posts you schedule will appear here. Use the scheduling panel to plan your LinkedIn content in advance.
          </p>
        </div>
      )}

      {/* Jobs List */}
      {jobs.length > 0 && (
        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {jobs.map((job, index) => {
            const datetime = formatDateTime(job.run_at);

            return (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  {/* Time Badge */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs font-semibold ${
                      datetime.isPast ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <div className="text-[10px] uppercase opacity-70">{datetime.date.split(' ')[0]}</div>
                      <div className="text-base">{datetime.date.split(' ')[1]}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(job.status, job.run_at)}
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{datetime.time}</span>
                        {datetime.relative && !datetime.isPast && (
                          <span className="text-blue-600 font-semibold ml-1">({datetime.relative})</span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {truncateText(job.caption)}
                    </p>
                  </div>

                  {/* Delete button (optional) */}
                  <div className="flex-shrink-0">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-600" onClick={() => console.log("Delete job:", job.run_at)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
