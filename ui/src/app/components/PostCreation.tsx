import { useState } from "react";
import { Sparkles, Image, Video, FileText, Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LinkedInPostPreview } from "./LinkedInPostPreview";
import { MediaUpload } from "./MediaUpload";
import { SchedulingPanel } from "./SchedulingPanel";

export function PostCreation() {
  const [prompt, setPrompt] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [uploadedMedia, setUploadedMedia] = useState<Array<{ type: string; url: string; name: string }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowPreview(false);
    // Simulate AI generation
    setTimeout(() => {
      const mockPost = `🚀 Excited to share some insights on AI-powered content creation!

After analyzing thousands of LinkedIn posts, here are 3 key patterns that drive engagement:

1️⃣ Start with a hook - Questions or bold statements perform 35% better
2️⃣ Use storytelling - Personal experiences create emotional connections
3️⃣ End with a clear CTA - Invite discussion or share resources

The future of content marketing isn't about replacing humans with AI—it's about empowering creators to work smarter.

What's your experience with AI tools? Drop a comment below! 👇

#LinkedInTips #ContentStrategy #AIMarketing #DigitalMarketing`;
      setGeneratedPost(mockPost);
      setIsGenerating(false);
      setShowPreview(true);
    }, 1500);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Prompt & Inputs */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">AI Post Generator</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  What would you like to post about?
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., Share insights about AI in content marketing, announce a new achievement, ask a thought-provoking question..."
                  className="min-h-[120px] resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Describe your topic, key points, or paste reference content
                </p>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Post
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Media Upload Section */}
          <MediaUpload uploadedMedia={uploadedMedia} setUploadedMedia={setUploadedMedia} />

          {/* Tips Section */}
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips for Better Posts</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Start with a compelling hook or question</li>
              <li>• Keep paragraphs short (2-3 lines max)</li>
              <li>• Use emojis strategically for visual breaks</li>
              <li>• Include 3-5 relevant hashtags</li>
              <li>• End with a clear call-to-action</li>
            </ul>
          </div>
        </div>

        {/* Right Panel - Preview & Scheduling */}
        <div className="space-y-6">
          <LinkedInPostPreview
            postText={generatedPost}
            uploadedMedia={uploadedMedia}
            onEdit={setGeneratedPost}
          />

          {generatedPost && (
            <SchedulingPanel />
          )}
        </div>
      </div>
    </div>
  );
}