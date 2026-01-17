import { useState } from "react";
import { ChatInterface, Message } from "./ChatInterface";
import { LinkedInPostPreview } from "./LinkedInPostPreview";
import { SchedulingPanel } from "./SchedulingPanel";
import { ScheduledJobsPanel } from "./ScheduledJobsPanel";
import { Badge } from "./ui/badge";
import { Calendar, CircleCheck, FileText, AlertCircle } from "lucide-react";
import { sendPostMessage } from "@/lib/api";

export function PostAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your LinkedIn Post Agent. I can help you create engaging posts, schedule them, and publish to LinkedIn. Just describe what you'd like to post about!",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [postStatus, setPostStatus] = useState<"draft" | "scheduled" | "posted">("draft");
  const [uploadedMedia, setUploadedMedia] = useState<Array<{ type: string; url: string; name: string }>>([]);
  const [sessionId, setSessionId] = useState<string>(`session-${Date.now()}`);
  const [apiError, setApiError] = useState<string | null>(null);

  // Send message to backend
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

    setIsTyping(true);
    try {
      const response = await sendPostMessage(message, sessionId);

      if (response.session_id) setSessionId(response.session_id);

      // Handle both string or object response
      let responseText = "";
      if (typeof response.response === "string") {
        responseText = response.response;
      } else if (response.response?.reply) {
        responseText = response.response.reply;
      }

      // Auto-detect if it's a LinkedIn-style post
      if (
        responseText &&
        (responseText.includes("#") ||
          responseText.includes("🚀") ||
          responseText.includes("💡") ||
          responseText.length > 200)
      ) {
        setGeneratedPost(responseText);
        setPostStatus("draft");
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
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
        content: `⚠️ Unable to connect to the backend. Please check that your FastAPI server is running.\n\nError: ${errorMessage}`,
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
        {/* Left Panel - Chat */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Post Agent</h2>
              <p className="text-sm text-gray-600 mt-1">Create, schedule, and publish LinkedIn posts</p>
            </div>
          </div>

          <div className="h-[calc(100vh-220px)] min-h-[500px]">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
              placeholder="Describe the post you want to create..."
              emptyStateTitle="Ready to create amazing posts"
              emptyStateDescription="Tell me what you want to post about, and I'll help you craft the perfect LinkedIn content."
            />
          </div>
        </div>

        {/* Right Panel - Post Preview & Scheduling */}
        <div className="space-y-6">
          {/* Status Card */}
          {generatedPost && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      postStatus === "posted"
                        ? "bg-green-50"
                        : postStatus === "scheduled"
                        ? "bg-blue-50"
                        : "bg-gray-50"
                    }`}
                  >
                    {postStatus === "posted" ? (
                      <CircleCheck className="w-5 h-5 text-green-600" />
                    ) : postStatus === "scheduled" ? (
                      <Calendar className="w-5 h-5 text-blue-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {postStatus === "posted"
                        ? "Published"
                        : postStatus === "scheduled"
                        ? "Scheduled"
                        : "Draft"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {postStatus === "posted"
                        ? "Posted recently"
                        : postStatus === "scheduled"
                        ? "Scheduled for your chosen time"
                        : "Ready to schedule or post"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={postStatus === "posted" ? "default" : "secondary"}
                  className={
                    postStatus === "posted"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : postStatus === "scheduled"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  {postStatus}
                </Badge>
              </div>
            </div>
          )}

          {/* LinkedIn Post Preview */}
          <LinkedInPostPreview postText={generatedPost} uploadedMedia={uploadedMedia} onEdit={setGeneratedPost} />

          {/* Scheduling Panel */}
          {generatedPost && <SchedulingPanel />}

          {/* Scheduled Jobs Panel */}
          <ScheduledJobsPanel />
        </div>
      </div>
    </div>
  );
}
