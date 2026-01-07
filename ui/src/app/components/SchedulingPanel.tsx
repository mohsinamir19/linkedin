import { useState } from "react";
import { Calendar, Clock, Send, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

type ScheduleDay = {
  day: string;
  enabled: boolean;
  time: string;
};

export function SchedulingPanel() {
  const [scheduleMode, setScheduleMode] = useState<"now" | "schedule">("now");
  const [posted, setPosted] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState<ScheduleDay[]>([
    { day: "Monday", enabled: true, time: "09:00" },
    { day: "Tuesday", enabled: true, time: "12:00" },
    { day: "Wednesday", enabled: false, time: "09:00" },
    { day: "Thursday", enabled: true, time: "18:00" },
    { day: "Friday", enabled: true, time: "15:00" },
    { day: "Saturday", enabled: false, time: "10:00" },
    { day: "Sunday", enabled: false, time: "10:00" },
  ]);

  const handleToggleDay = (index: number) => {
    const updated = [...weeklySchedule];
    updated[index].enabled = !updated[index].enabled;
    setWeeklySchedule(updated);
  };

  const handleTimeChange = (index: number, time: string) => {
    const updated = [...weeklySchedule];
    updated[index].time = time;
    setWeeklySchedule(updated);
  };

  const handlePost = () => {
    setPosted(true);
    setTimeout(() => setPosted(false), 3000);
  };

  const nextScheduledPost = weeklySchedule.find(d => d.enabled);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Calendar className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Publishing</h3>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setScheduleMode("now")}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
            scheduleMode === "now"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }`}
        >
          <Send className="w-4 h-4 mx-auto mb-1" />
          <p className="text-sm font-semibold">Post Now</p>
        </button>
        <button
          onClick={() => setScheduleMode("schedule")}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
            scheduleMode === "schedule"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }`}
        >
          <Clock className="w-4 h-4 mx-auto mb-1" />
          <p className="text-sm font-semibold">Schedule</p>
        </button>
      </div>

      {/* Post Now Section */}
      {scheduleMode === "now" && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              Your post will be published immediately to LinkedIn.
            </p>
            <Button
              onClick={handlePost}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={posted}
            >
              {posted ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Posted Successfully!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Publish to LinkedIn
                </>
              )}
            </Button>
          </div>

          {posted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900">Post published!</p>
                  <p className="text-sm text-green-700 mt-0.5">
                    Your post is now live on LinkedIn.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Schedule Section */}
      {scheduleMode === "schedule" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-900">
              {nextScheduledPost ? (
                <>
                  Next post scheduled for <span className="font-semibold">{nextScheduledPost.day}</span> at{" "}
                  <span className="font-semibold">{nextScheduledPost.time}</span>
                </>
              ) : (
                "No posts scheduled yet. Enable at least one day below."
              )}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-700 mb-3">Weekly Schedule</p>
            {weeklySchedule.map((schedule, index) => (
              <div
                key={schedule.day}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  schedule.enabled
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <Switch
                  checked={schedule.enabled}
                  onCheckedChange={() => handleToggleDay(index)}
                  id={`day-${index}`}
                />
                <Label
                  htmlFor={`day-${index}`}
                  className={`flex-1 cursor-pointer ${
                    schedule.enabled ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {schedule.day}
                </Label>
                <input
                  type="time"
                  value={schedule.time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  disabled={!schedule.enabled}
                  className={`px-3 py-1.5 border rounded-md text-sm ${
                    schedule.enabled
                      ? "border-blue-300 bg-white text-gray-900"
                      : "border-gray-200 bg-gray-100 text-gray-400"
                  }`}
                />
              </div>
            ))}
          </div>

          <Button
            onClick={handlePost}
            className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
            disabled={!weeklySchedule.some(d => d.enabled) || posted}
          >
            {posted ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Schedule Saved!
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Save Schedule
              </>
            )}
          </Button>

          {posted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900">Schedule saved!</p>
                  <p className="text-sm text-green-700 mt-0.5">
                    Your weekly posting schedule is now active.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
