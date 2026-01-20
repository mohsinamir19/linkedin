import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Send, Eye } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface LinkedInPostPreviewProps {
  postText: string;
  uploadedMedia: Array<{ type: string; url: string; name: string }>;
  onEdit: (text: string) => void;
}

export function LinkedInPostPreview({
  postText,
  uploadedMedia,
  onEdit,
}: LinkedInPostPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!postText) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-gray-400" />
          <h2 className="font-semibold text-gray-900">LinkedIn Preview</h2>
        </div>

        <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-gray-200 rounded-lg">
          <div className="text-center px-4">
            <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Generate a post to see the preview</p>
            <p className="text-sm text-gray-400 mt-1">
              It will look exactly like a real LinkedIn post
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        bg-white rounded-xl border border-gray-200 shadow-sm
        lg:sticky lg:top-24
        animate-in fade-in slide-in-from-top-4 duration-500
      "
    >
      <div className="p-5 sm:p-6 pb-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">LinkedIn Preview</h2>
          <button
            onClick={() => setIsEditing((v) => !v)}
            className="ml-auto text-sm text-blue-600 hover:text-blue-700"
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        </div>

        {/* Post Card */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 pb-3 flex gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
              YN
            </div>
            <div>
              <p className="font-semibold text-gray-900">Your Name</p>
              <p className="text-sm text-gray-600">
                Your Headline • Product Manager at Company
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Now • 🌍</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-3">
            {isEditing ? (
              <Textarea
                value={postText}
                onChange={(e) => onEdit(e.target.value)}
                className="min-h-[200px] resize-none border-blue-200 focus:border-blue-400"
              />
            ) : (
              <div className="whitespace-pre-wrap break-words text-gray-900">
                {postText}
              </div>
            )}
          </div>

          {/* Media */}
          {uploadedMedia.length > 0 && (
            <div className="px-4 pb-3">
              <div
                className={`grid gap-2 ${
                  uploadedMedia.length === 1 ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {uploadedMedia.map((media, i) => (
                  <div
                    key={i}
                    className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                  >
                    {media.type.startsWith("image/") ? (
                      <img
                        src={media.url}
                        alt={media.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        {media.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-600 flex justify-between">
            <span>0 reactions</span>
            <div className="flex gap-3">
              <span>0 comments</span>
              <span>0 reposts</span>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 flex">
            {[
              { icon: Heart, label: "Like" },
              { icon: MessageCircle, label: "Comment" },
              { icon: Repeat2, label: "Repost" },
              { icon: Send, label: "Send" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="hidden sm:inline text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
