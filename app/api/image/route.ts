import { NextRequest, NextResponse } from "next/server";
import { validateImageParams } from "@/lib/validation";
import { generateInitialsImage } from "@/lib/imageGenerator";
import { ImageGenerationParams } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse parameters
    const params: ImageGenerationParams = {
      name: searchParams.get("name") || "",
      width: searchParams.get("width") ? Number(searchParams.get("width")) : undefined,
      height: searchParams.get("height") ? Number(searchParams.get("height")) : undefined,
      color: searchParams.get("color") || undefined,
      bcolor: searchParams.get("bcolor") || undefined,
      radius: searchParams.get("radius") ? Number(searchParams.get("radius")) : undefined,
      gradient: searchParams.get("gradient") === "true",
      gradientDirection: searchParams.get("gradientDirection") || undefined,
      gradientColor: searchParams.get("gradientColor") || undefined,
      imageType: searchParams.get("imageType") || undefined,
    };

    // Validate parameters
    const validation = validateImageParams(params);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Invalid parameters", details: validation.errors },
        { status: 400 }
      );
    }

    const { data, contentType } = await generateInitialsImage(
      validation.validatedParams!
    );

    return new NextResponse(
      data instanceof Buffer ? data : data, // Buffer or string
      {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Disposition": `inline; filename="initials-${
            validation.validatedParams!.initials
          }.${validation.validatedParams!.imageType}"`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error generating image:", error);

    const apiError = {
      error: "Internal server error",
      details: "Failed to generate image",
    };

    return NextResponse.json(apiError, { status: 500 });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
