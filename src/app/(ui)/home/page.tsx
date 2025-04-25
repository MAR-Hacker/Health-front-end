"use client";
import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

type CloudinaryResult = {
  event?: string;
  info?: {
    public_id: string;
  };
  error?: {
    message: string;
  };
};

export default function ImageTransformer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [transformedUrl, setTransformedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTransform = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/transform-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imagePublicId: selectedImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Transformation failed");
      }

      setTransformedUrl(data.transformedUrl);
    } catch (err) {
      console.error("Transformation error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to transform image"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (result: CloudinaryResult) => {
    if (result.event === "success" && result.info) {
      setSelectedImage(result.info.public_id);
      setTransformedUrl(null);
      setError(null);
    } else if (result.error) {
      setError(result.error.message || "Upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-8">Image Transformer</h1>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        {/* Image Selection Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">1. Select Image</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Option 1: Upload new image */}
            <div className="flex-1">
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onUpload={handleUpload}
                options={{
                  sources: ["local"],
                  multiple: false,
                  maxFiles: 1,
                  cropping: true,
                  croppingAspectRatio: 1,
                  croppingShowBackButton: true,
                  styles: {
                    palette: {
                      window: "#FFFFFF",
                      sourceBg: "#F4F4F5",
                      windowBorder: "#90A0B3",
                      tabIcon: "#000000",
                      inactiveTabIcon: "#555A5F",
                      menuIcons: "#555A5F",
                      link: "#000000",
                      action: "#000000",
                      inProgress: "#464646",
                      complete: "#000000",
                      error: "#FF0000",
                      textDark: "#000000",
                      textLight: "#FFFFFF",
                    },
                  },
                }}
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-3 px-4 rounded border border-blue-200 transition-colors"
                  >
                    Upload New Image
                  </button>
                )}
              </CldUploadWidget>
            </div>

            {/* Option 2: Use sample image */}
            <button
              onClick={() => {
                setSelectedImage("cld-sample-5");
                setTransformedUrl(null);
                setError(null);
              }}
              className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-3 px-4 rounded border border-gray-200 transition-colors"
            >
              Use Sample Image
            </button>
          </div>
        </div>

        {/* Preview Section */}
        {selectedImage && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">2. Preview</h2>
            <div className="border rounded-lg overflow-hidden">
              <CldImage
                src={selectedImage}
                width="600"
                height="400"
                alt="Selected image"
                className="w-full h-auto"
              />
            </div>
          </div>
        )}

        {/* Transformation Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">3. Transform</h2>
          <button
            onClick={handleTransform}
            disabled={!selectedImage || loading}
            className={`w-full py-3 px-4 rounded font-medium transition-colors ${
              !selectedImage || loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Processing..." : "Transform Image"}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded border border-red-200">
            {error}
          </div>
        )}

        {/* Result Section */}
        {transformedUrl && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Transformed Result</h2>
            <div className="border rounded-lg overflow-hidden mb-4">
              <CldImage
                src={transformedUrl}
                width="600"
                height="400"
                alt="Transformed result"
                className="w-full h-auto"
              />
            </div>
            <div className="flex justify-between items-center">
              <a
                href={transformedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open in new tab
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(transformedUrl);
                  alert("URL copied to clipboard!");
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                Copy URL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
