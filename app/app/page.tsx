"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Download,
  Link as LinkIcon,
  RefreshCw,
  Settings,
  Palette,
  Type,
  Shapes,
  Filter,
  Copy,
  Eye,
  ImageIcon,
} from "lucide-react";
import { FormData } from "@/types";
import { extractInitials } from "@/lib/validation";

export default function AppPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "John Doe",
    height: 256,
    width: 256,
    textColor: "#000000",
    backgroundColor: "#3b82f6",
    radius: 0,
    gradient: false,
    gradientDirection: "to bottom",
    gradientColor: "#FF0000",
    imageType: "svg",
  });

  const [imageUrl, setImageUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [shareableUrl, setShareableUrl] = useState<string>("");

  const colorThemes = {
    pastel: [
      { hex: '#FFB3BA' },
      { hex: '#BAFFC9' },
      { hex: '#BAE1FF' },
      { hex: '#FFFFBA' },
      { hex: '#FFDFBA' },
    ],
    neon: [
      { hex: '#FF073A' },
      { hex: '#39FF14' },
      { hex: '#0080FF' },
      { hex: '#FFFF00' },
      { hex: '#FF8C00' },
    ],
    brand: [
      { hex: '#1DA1F2' },
      { hex: '#4267B2' },
      { hex: '#E60023' },
      { hex: '#25D366' },
      { hex: '#FF5722' },
    ],
  };

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setError("");
  }, []);

  const generateImageUrl = useCallback(() => {
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
      imageType: formData.imageType,
    });

    return `/api/image?${params.toString()}`;
  }, [formData]);

  const generatePreview = useCallback(async () => {
    if (!formData.name.trim()) {
      setError("Please enter a name");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const url = generateImageUrl();
      setImageUrl(url);

      // Generate shareable URL
      const configBase64 = (JSON.stringify(formData));
      setShareableUrl(`${window.location.origin}${url}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate avatar');
    } finally {
      setIsGenerating(false);
    }
  }, [formData, generateImageUrl]);

  const copyShareableUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `avatar-${formData.name.replace(/\s+/g, "-").toLowerCase()}.${formData.imageType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (formData.name.trim()) {
      generatePreview();
    } else {
      setImageUrl("");
    }
  }, [formData, generatePreview]);

  useEffect(() => {
    // Load config from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const configParam = urlParams.get('config');
    if (configParam) {
      try {
        const decodedConfig = JSON.parse(atob(configParam));
        setFormData(prev => ({ ...prev, ...decodedConfig }));
      } catch (err) {
        console.error('Failed to load config from URL:', err);
      }
    }
  }, []);

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
                  Avatar Generator
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Avatar Configuration</CardTitle>
                <CardDescription>
                  Customize your avatar with advanced options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="shape">Shape</TabsTrigger>
                    <TabsTrigger value="effects">Effects</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        placeholder="Enter full name"
                      />
                      {initials && (
                        <p className="text-sm text-blue-600 mt-1">
                          Preview initials: <span className="font-semibold">{initials}</span>
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Width: {formData.width}px</Label>
                        <Slider
                          value={[formData.width]}
                          onValueChange={([value]) => updateFormData({ width: value })}
                          min={64}
                          max={512}
                          step={64}
                        />
                      </div>
                      <div>
                        <Label>Height: {formData.height}px</Label>
                        <Slider
                          value={[formData.height]}
                          onValueChange={([value]) => updateFormData({ height: value })}
                          min={64}
                          max={512}
                          step={64}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Export Format</Label>
                      <Select
                        value={formData.imageType}
                        onValueChange={(value) => updateFormData({ imageType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="svg">SVG</SelectItem>
                          <SelectItem value="png">PNG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="colors" className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Text Color</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <input
                            type="color"
                            value={formData.textColor}
                            onChange={(e) => updateFormData({ textColor: e.target.value })}
                            className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                          />
                          <Input
                            value={formData.textColor}
                            onChange={(e) => updateFormData({ textColor: e.target.value })}
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Background Color</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <input
                            type="color"
                            value={formData.backgroundColor}
                            onChange={(e) => updateFormData({ backgroundColor: e.target.value })}
                            className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                          />
                          <Input
                            value={formData.backgroundColor}
                            onChange={(e) => updateFormData({ backgroundColor: e.target.value })}
                            placeholder="#3b82f6"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Color Themes</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {Object.entries(colorThemes).map(([theme, colors]) => (
                          <div key={theme} className="space-y-2">
                            <p className="text-sm font-medium capitalize">{theme}</p>
                            <div className="flex space-x-1">
                              {colors.map((color, index) => (
                                <button
                                  key={index}
                                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                                  style={{ backgroundColor: color.hex }}
                                  onClick={() => updateFormData({ backgroundColor: color.hex })}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={formData.gradient}
                          onCheckedChange={(checked) => updateFormData({ gradient: checked })}
                        />
                        <Label>Enable Gradient Background</Label>
                      </div>

                      {formData.gradient && (
                        <>
                          <div>
                            <Label>Gradient Direction</Label>
                            <Select
                              value={formData.gradientDirection}
                              onValueChange={(value) => updateFormData({ gradientDirection: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="to bottom">Top to Bottom</SelectItem>
                                <SelectItem value="to top">Bottom to Top</SelectItem>
                                <SelectItem value="to right">Left to Right</SelectItem>
                                <SelectItem value="to left">Right to Left</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Gradient Color</Label>
                            <div className="flex items-center space-x-2 mt-1">
                              <input
                                type="color"
                                value={formData.gradientColor}
                                onChange={(e) => updateFormData({ gradientColor: e.target.value })}
                                className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
                              />
                              <Input
                                value={formData.gradientColor}
                                onChange={(e) => updateFormData({ gradientColor: e.target.value })}
                                placeholder="#FF0000"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="shape" className="space-y-6">
                    <div>
                      <Label>Border Radius: {formData.radius}px</Label>
                      <Slider
                        value={[formData.radius]}
                        onValueChange={([value]) => updateFormData({ radius: value })}
                        max={50}
                        step={1}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        0 = square corners, higher values = more rounded
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="effects" className="space-y-6">
                    <div className="text-center text-gray-500">
                      <Filter className="h-12 w-12 mx-auto mb-2" />
                      <p>Advanced effects coming soon!</p>
                      <p className="text-sm">Filters, shadows, and more customization options.</p>
                    </div>
                  </TabsContent>
                </Tabs>

                {error && (
                  <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="mt-6">
                  <Button
                    onClick={generatePreview}
                    disabled={isGenerating || !formData.name.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Generate Avatar
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Live Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  {imageUrl ? (
                    <div className="inline-block p-4 bg-gray-50 rounded-lg">
                      <img
                        src={imageUrl}
                        alt={`Avatar for ${formData.name}`}
                        className="max-w-full h-auto border border-gray-200 rounded"
                        style={{
                          maxWidth: Math.min(formData.width, 300),
                          maxHeight: Math.min(formData.height, 300),
                        }}
                        onError={() => setError("Failed to load image")}
                      />
                    </div>
                  ) : (
                    <div className="py-12 text-gray-500">
                      <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No Preview Available</p>
                      <p className="text-sm">Enter a name to generate an avatar</p>
                    </div>
                  )}

                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={downloadImage}
                      disabled={!imageUrl}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download {formData.imageType.toUpperCase()}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {shareableUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LinkIcon className="h-5 w-5" />
                    <span>Share Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs font-mono break-all">{shareableUrl}</p>
                    </div>
                    <Button
                      onClick={copyShareableUrl}
                      variant="outline"
                      className="w-full"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? "Copied!" : "Copy URL"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* API Usage Example */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">API Usage Example</h3>
          <p className="text-gray-300 mb-4">
            Use our API to generate avatars programmatically:
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