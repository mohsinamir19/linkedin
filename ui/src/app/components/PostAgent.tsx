import { useState } from "react";
import { ChatInterface, Message } from "./ChatInterface";
import { LinkedInPostPreview } from "./LinkedInPostPreview";
import { SchedulingPanel } from "./SchedulingPanel";
import { ScheduledJobsPanel } from "./ScheduledJobsPanel";
import { sendPostMessage } from "@/lib/api";

export function PostAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your LinkedIn Post Agent. Describe what you'd like to post about!",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");
  const [postStatus, setPostStatus] = useState<"draft" | "scheduled" | "posted">("draft");
  const [uploadedMedia, setUploadedMedia] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState<string>(`session-${Date.now()}`);

  const handleSendMessage = async (message: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: message, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await sendPostMessage(message, sessionId);
      if (response.session_id) setSessionId(response.session_id);

      const aiData = response.response;
      let displayMsg = "";

      // ✅ LOGIC: Detect and format the Object from your logs
      if (typeof aiData === "string") {
        displayMsg = aiData;
      } else if (aiData && aiData.caption) {
        // Update the Preview Panel
        setGeneratedPost(aiData.caption);
        
        if (aiData.file_path) {
          setUploadedMedia([{ type: "image", url: `file://${aiData.file_path}`, name: "Attached Image" }]);
        }

        // Format a "Human Friendly" chat message
        if (aiData.mode === "schedule") {
          setPostStatus("scheduled");
          displayMsg = `📅 **Post Scheduled Successfully!**\n\nI have scheduled your post for medical AI use cases. It will go live at: **${aiData.run_at}**. You can see it in the scheduled jobs panel.`;
        } else {
          setPostStatus("draft");
          displayMsg = "✨ **Post Generated!**\n\nI've crafted your LinkedIn post. You can see the preview in the right panel. Would you like to edit anything or publish it now?";
        }
      } else {
        displayMsg = aiData?.reply || "I've processed your request.";
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: displayMsg,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[calc(100vh-200px)]">
          <ChatInterface messages={messages} onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
        <div className="space-y-6">
          <LinkedInPostPreview postText={generatedPost} uploadedMedia={uploadedMedia} onEdit={setGeneratedPost} />
          {generatedPost && <SchedulingPanel />}
          <ScheduledJobsPanel />
        </div>
      </div>
    </div>
  );
}