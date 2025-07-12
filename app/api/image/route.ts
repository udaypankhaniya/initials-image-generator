import { NextRequest, NextResponse } from "next/server";
import { validateImageParams } from "@/lib/validation";
import { generateInitialsImage } from "@/lib/imageGenerator";
import { ApiError } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const params = {
      name: searchParams.get("name") || "",
      height: searchParams.get("height")
        ? Number(searchParams.get("height"))
        : undefined,
      width: searchParams.get("width")
        ? Number(searchParams.get("width"))
        : undefined,
      color: searchParams.get("color")
        ? decodeURIComponent(searchParams.get("color")!)
        : undefined,
      bcolor: searchParams.get("bcolor")
        ? decodeURIComponent(searchParams.get("bcolor")!)
        : undefined,
      radius: searchParams.get("radius")
        ? Number(searchParams.get("radius"))
        : undefined,
      gradient: searchParams.get("gradient") === "true",
      gradientDirection: searchParams.get("gradientDirection") || undefined,
      gradientColor: searchParams.get("gradientColor")
        ? decodeURIComponent(searchParams.get("gradientColor")!)
        : undefined,
      imageType: searchParams.get("imageType") || "svg",
    };

    // Validate parameters
    const validation = validateImageParams(params);

    if (!validation.isValid) {
      const error: ApiError = {
        error: "Invalid parameters",
        details: validation.errors.join(", "),
      };

      return NextResponse.json(error, { status: 400 });
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

    const apiError: ApiError = {
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
