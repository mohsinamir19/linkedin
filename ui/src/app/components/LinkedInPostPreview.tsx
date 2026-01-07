import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Send, Eye } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface LinkedInPostPreviewProps {
  postText: string;
  uploadedMedia: Array<{ type: string; url: string; name: string }>;
  onEdit: (text: string) => void;
}

export function LinkedInPostPreview({ postText, uploadedMedia, onEdit }: LinkedInPostPreviewProps) {
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
            <p className="text-sm text-gray-400 mt-1">It will look exactly like a real LinkedIn post</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-24 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">LinkedIn Preview</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="ml-auto text-sm text-blue-600 hover:text-blue-700"
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        </div>

        {/* LinkedIn Post Card */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Post Header */}
          <div className="p-4 pb-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">YN</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">Your Name</p>
                <p className="text-sm text-gray-600">Your Headline • Product Manager at Company</p>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  Now • 
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
                  </svg>
                </p>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-3">
            {isEditing ? (
              <Textarea
                value={postText}
                onChange={(e) => onEdit(e.target.value)}
                className="min-h-[200px] resize-none border-blue-200 focus:border-blue-400"
              />
            ) : (
              <div className="text-gray-900 whitespace-pre-wrap break-words">
                {postText}
              </div>
            )}
          </div>

          {/* Media Preview */}
          {uploadedMedia.length > 0 && (
            <div className="px-4 pb-3">
              <div className={`grid gap-2 ${uploadedMedia.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {uploadedMedia.map((media, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center"
                  >
                    {media.type.startsWith('image/') && media.url ? (
                      <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                    ) : media.type.startsWith('video/') ? (
                      <div className="text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center p-4">
                        <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-xs mt-2 text-gray-500 truncate">{media.name}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Stats */}
          <div className="px-4 py-2 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span className="hover:text-blue-600 cursor-pointer">127 reactions</span>
              <div className="flex gap-3">
                <span className="hover:text-blue-600 cursor-pointer">24 comments</span>
                <span className="hover:text-blue-600 cursor-pointer">8 reposts</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-2 py-1.5 border-t border-gray-200 flex items-center justify-around">
            <button className="flex items-center gap-2 px-2 sm:px-4 py-2 rounded hover:bg-gray-100 transition-colors flex-1 justify-center">
              <Heart className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700 hidden sm:inline">Like</span>
            </button>
            <button className="flex items-center gap-2 px-2 sm:px-4 py-2 rounded hover:bg-gray-100 transition-colors flex-1 justify-center">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700 hidden sm:inline">Comment</span>
            </button>
            <button className="flex items-center gap-2 px-2 sm:px-4 py-2 rounded hover:bg-gray-100 transition-colors flex-1 justify-center">
              <Repeat2 className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700 hidden sm:inline">Repost</span>
            </button>
            <button className="flex items-center gap-2 px-2 sm:px-4 py-2 rounded hover:bg-gray-100 transition-colors flex-1 justify-center">
              <Send className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700 hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}