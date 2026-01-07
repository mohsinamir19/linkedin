import { useRef } from "react";
import { Image, Video, FileText, Upload, X } from "lucide-react";
import { Button } from "./ui/button";

interface MediaUploadProps {
  uploadedMedia: Array<{ type: string; url: string; name: string }>;
  setUploadedMedia: (media: Array<{ type: string; url: string; name: string }>) => void;
}

export function MediaUpload({ uploadedMedia, setUploadedMedia }: MediaUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newMedia = Array.from(files).map(file => ({
      type: file.type,
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
      name: file.name,
    }));

    setUploadedMedia([...uploadedMedia, ...newMedia]);
  };

  const removeMedia = (index: number) => {
    setUploadedMedia(uploadedMedia.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Attach Media</h3>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.accept = "image/*";
                fileInputRef.current.click();
              }
            }}
          >
            <Image className="w-5 h-5 text-blue-600" />
            <span className="text-sm">Image</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.accept = "video/*";
                fileInputRef.current.click();
              }
            }}
          >
            <Video className="w-5 h-5 text-purple-600" />
            <span className="text-sm">Video</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.accept = ".pdf,.ppt,.pptx,.doc,.docx";
                fileInputRef.current.click();
              }
            }}
          >
            <FileText className="w-5 h-5 text-orange-600" />
            <span className="text-sm">Document</span>
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Uploaded Media Preview */}
        {uploadedMedia.length > 0 && (
          <div className="space-y-2 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">Uploaded files ({uploadedMedia.length})</p>
            {uploadedMedia.map((media, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 group"
              >
                {media.type.startsWith('image/') && media.url ? (
                  <img src={media.url} alt={media.name} className="w-12 h-12 object-cover rounded" />
                ) : media.type.startsWith('video/') ? (
                  <div className="w-12 h-12 bg-purple-100 rounded flex items-center justify-center">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{media.name}</p>
                  <p className="text-xs text-gray-500">{media.type}</p>
                </div>
                <button
                  onClick={() => removeMedia(index)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-2">
          Supported: Images (JPG, PNG), Videos (MP4), Documents (PDF, PPT, DOC)
        </p>
      </div>
    </div>
  );
}
