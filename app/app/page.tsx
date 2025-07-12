"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ImageIcon,
  ArrowLeft,
  Download,
  Link as LinkIcon,
  RefreshCw,
} from "lucide-react";
import { FormData } from "@/types";
import { extractInitials } from "@/lib/validation";

export default function AppPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    height: 200,
    width: 200,
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
    radius: 0,
    gradient: false,
    gradientDirection: "to bottom",
    gradientColor: "#FF0000",
    imageType: "svg", // Added image type field
  });

  const [imageUrl, setImageUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const generateImageUrl = () => {
    if (!formData.name.trim()) return "";

    const params = new URLSearchParams({
      name: formData.name,
      height: formData.height.toString(),
      width: formData.width.toString(),
      color: formData.textColor,
      bcolor: formData.backgroundColor,
      radius: formData.radius.toString(),
      gradient: formData.gradient.toString(),
      gradientDirection: formData.gradientDirection,
      gradientColor: formData.gradientColor,
      imageType: formData.imageType, // Added image type parameter
    });

    return `/api/image?${params.toString()}`;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const handleGenerate = async () => {
    if (!formData.name.trim()) {
      setError("Please enter a name");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const url = generateImageUrl();
      setImageUrl(url);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    const fullUrl = `${window.location.origin}${imageUrl}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `initials-${formData.name
      .replace(/\s+/g, "-")
      .toLowerCase()}.${formData.imageType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (formData.name.trim()) {
      const url = generateImageUrl();
      setImageUrl(url);
    } else {
      setImageUrl("");
    }
  }, [formData]);

  const initials = extractInitials(formData.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Image Generator
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Customize Your Image
            </h2>

            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter full name (e.g., John Doe)"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                  aria-describedby="name-help"
                />
                <p id="name-help" className="text-xs text-gray-500 mt-1">
                  Initials will be extracted from first and last name
                </p>
                {initials && (
                  <p className="text-sm text-blue-600 mt-1">
                    Preview initials:{" "}
                    <span className="font-semibold">{initials}</span>
                  </p>
                )}
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="width"
                    className="text-sm font-medium text-gray-700"
                  >
                    Width (px)
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    min="100"
                    max="1000"
                    value={formData.width}
                    onChange={(e) =>
                      handleInputChange(
                        "width",
                        parseInt(e.target.value) || 200
                      )
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="height"
                    className="text-sm font-medium text-gray-700"
                  >
                    Height (px)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    min="100"
                    max="1000"
                    value={formData.height}
                    onChange={(e) =>
                      handleInputChange(
                        "height",
                        parseInt(e.target.value) || 200
                      )
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Image Type */}
              <div>
                <Label
                  htmlFor="imageType"
                  className="text-sm font-medium text-gray-700"
                >
                  Image Type
                </Label>
                <select
                  id="imageType"
                  value={formData.imageType}
                  onChange={(e) =>
                    handleInputChange("imageType", e.target.value)
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="svg">SVG</option>
                  <option value="png">PNG</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  SVG for scalable vector graphics, PNG for raster images
                </p>
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="textColor"
                    className="text-sm font-medium text-gray-700"
                  >
                    Text Color
                  </Label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      id="textColor"
                      type="color"
                      value={formData.textColor}
                      onChange={(e) =>
                        handleInputChange("textColor", e.target.value)
                      }
                      className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.textColor}
                      onChange={(e) =>
                        handleInputChange("textColor", e.target.value)
                      }
                      className="flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="backgroundColor"
                    className="text-sm font-medium text-gray-700"
                  >
                    Background Color
                  </Label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      id="backgroundColor"
                      type="color"
                      value={formData.backgroundColor}
                      onChange={(e) =>
                        handleInputChange("backgroundColor", e.target.value)
                      }
                      className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.backgroundColor}
                      onChange={(e) =>
                        handleInputChange("backgroundColor", e.target.value)
                      }
                      className="flex-1"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
              </div>

              {/* Radius */}
              <div>
                <Label
                  htmlFor="radius"
                  className="text-sm font-medium text-gray-700"
                >
                  Border Radius (px)
                </Label>
                <Input
                  id="radius"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.radius}
                  onChange={(e) =>
                    handleInputChange("radius", parseInt(e.target.value) || 0)
                  }
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  0 = square corners, higher values = more rounded
                </p>
              </div>

              {/* Gradient */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    id="gradient"
                    type="checkbox"
                    checked={formData.gradient}
                    onChange={(e) =>
                      handleInputChange("gradient", e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <Label
                    htmlFor="gradient"
                    className="text-sm font-medium text-gray-700"
                  >
                    Enable Gradient Background
                  </Label>
                </div>

                {formData.gradient && (
                  <div>
                    <Label
                      htmlFor="gradientDirection"
                      className="text-sm font-medium text-gray-700"
                    >
                      Gradient Direction
                    </Label>
                    <select
                      id="gradientDirection"
                      value={formData.gradientDirection}
                      onChange={(e) =>
                        handleInputChange("gradientDirection", e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="to bottom">Top to Bottom</option>
                      <option value="to top">Bottom to Top</option>
                      <option value="to right">Left to Right</option>
                      <option value="to left">Right to Left</option>
                    </select>
                  </div>
                )}

                {formData.gradient && (
                  <div>
                    <Label
                      htmlFor="gradientColor"
                      className="text-sm font-medium text-gray-700"
                    >
                      Gradient Color
                    </Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <input
                        id="gradientColor"
                        type="color"
                        value={formData.gradientColor}
                        onChange={(e) =>
                          handleInputChange("gradientColor", e.target.value)
                        }
                        className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={formData.gradientColor}
                        onChange={(e) =>
                          handleInputChange("gradientColor", e.target.value)
                        }
                        className="flex-1"
                        placeholder="#FF0000"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      This color will blend with the background color
                    </p>
                  </div>
                )}
              </div>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !formData.name.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Image"
                )}
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>

            <div className="text-center">
              {imageUrl ? (
                <div className="space-y-4">
                  <div className="inline-block p-4 bg-gray-50 rounded-lg">
                    <img
                      src={imageUrl}
                      alt={`Initials for ${formData.name}`}
                      className="max-w-full h-auto border border-gray-200 rounded"
                      style={{
                        maxWidth: Math.min(formData.width, 400),
                        maxHeight: Math.min(formData.height, 400),
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm text-gray-600 mb-1">
                        Generated URL:
                      </p>
                      <p className="text-xs font-mono bg-white p-2 rounded border break-all">
                        {window.location.origin}
                        {imageUrl}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="flex-1"
                      >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        {copied ? "Copied!" : "Copy URL"}
                      </Button>
                      <Button
                        onClick={downloadImage}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-gray-500">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No Preview Available</p>
                  <p className="text-sm">
                    Enter a name to generate an image preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* API Usage Example */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">API Usage Example</h3>
          <p className="text-gray-300 mb-4">
            Use our API to generate images programmatically:
          </p>
          <div className="bg-gray-800 rounded-md p-4 overflow-x-auto">
            <code className="text-green-400 text-sm whitespace-pre">
              {`GET /api/image?name=${encodeURIComponent(
                formData.name || "John Doe"
              )}&width=${formData.width}&height=${
                formData.height
              }&color=${encodeURIComponent(
                formData.textColor
              )}&bcolor=${encodeURIComponent(
                formData.backgroundColor
              )}&radius=${formData.radius}&gradient=${
                formData.gradient
              }&gradientDirection=${encodeURIComponent(
                formData.gradientDirection
              )}&imageType=${formData.imageType}`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
