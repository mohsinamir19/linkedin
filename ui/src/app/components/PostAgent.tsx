import { useState } from "react";
import { ChatInterface, Message } from "./ChatInterface";
import { LinkedInPostPreview } from "./LinkedInPostPreview";
import { SchedulingPanel } from "./SchedulingPanel";
import { Badge } from "./ui/badge";
import { Calendar, CircleCheck, FileText } from "lucide-react";

export function PostAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your LinkedIn Post Agent. I can help you create engaging posts, schedule them, and publish to LinkedIn. Just describe what you'd like to post about!",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [postStatus, setPostStatus] = useState<"draft" | "scheduled" | "posted">("draft");
  const [uploadedMedia, setUploadedMedia] = useState<Array<{ type: string; url: string; name: string }>>([]);

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
      // Generate a post based on the message
      const mockPost = `🚀 Excited to share insights on ${message.toLowerCase().includes("ai") ? "AI" : "innovation"}!

After working in this space, here are 3 key takeaways:

1️⃣ ${message.includes("?") ? "Great question! Here's what I've learned" : "Start with authenticity"} - Be genuine in your approach
2️⃣ Data-driven decisions matter - Let metrics guide your strategy
3️⃣ Community engagement is everything - Your network is your net worth

The future is about collaboration, not competition.

What are your thoughts? Let's discuss in the comments! 👇

#LinkedIn #ProfessionalGrowth #Innovation`;

      setGeneratedPost(mockPost);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've created a LinkedIn post based on your request! You can see it in the preview on the right.

Here's what I've included:
• A compelling hook with an emoji
• 3 key points formatted with numbered emojis
• A clear call-to-action
• Relevant hashtags

Would you like me to:
- Modify the tone or content?
- Schedule this post for a specific time?
- Add media attachments?
- Post it immediately?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
      setPostStatus("draft");
    }, 1500);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Chat Interface */}
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

        {/* Right Panel - Post Preview & Status */}
        <div className="space-y-6">
          {/* Status Card */}
          {generatedPost && (
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    postStatus === "posted" ? "bg-green-50" :
                    postStatus === "scheduled" ? "bg-blue-50" :
                    "bg-gray-50"
                  }`}>
                    {postStatus === "posted" ? <CircleCheck className="w-5 h-5 text-green-600" /> :
                     postStatus === "scheduled" ? <Calendar className="w-5 h-5 text-blue-600" /> :
                     <FileText className="w-5 h-5 text-gray-600" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {postStatus === "posted" ? "Published" :
                       postStatus === "scheduled" ? "Scheduled" :
                       "Draft"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {postStatus === "posted" ? "Posted 2 minutes ago" :
                       postStatus === "scheduled" ? "Scheduled for Tuesday, 9:00 AM" :
                       "Ready to schedule or post"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={postStatus === "posted" ? "default" : "secondary"}
                  className={
                    postStatus === "posted" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                    postStatus === "scheduled" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }
                >
                  {postStatus}
                </Badge>
              </div>
            </div>
          )}

          {/* LinkedIn Preview */}
          <LinkedInPostPreview
            postText={generatedPost}
            uploadedMedia={uploadedMedia}
            onEdit={setGeneratedPost}
          />

          {/* Scheduling Panel */}
          {generatedPost && (
            <SchedulingPanel />
          )}
        </div>
      </div>
    </div>
  );
}