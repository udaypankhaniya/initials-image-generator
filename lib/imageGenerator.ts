import { ValidatedImageParams } from "@/types";
import sharp from "sharp";

export async function generateInitialsImage(
  params: ValidatedImageParams
): Promise<{ data: Buffer | string; contentType: string }> {
  const {
    width,
    height,
    color,
    bcolor,
    initials,
    radius,
    gradient,
    gradientDirection,
    gradientColor,
    imageType,
  } = params;

  // Create SVG content
  const fontSize = Math.min(width, height) * 0.4;

  // Create background fill
  let backgroundFill = bcolor;
  let gradientDef = "";

  if (gradient) {
    const gradientId = "grad1";
    gradientDef = `
      <defs>
        <linearGradient id="${gradientId}" gradientTransform="rotate(${
      gradientDirection === "to right"
        ? "0"
        : gradientDirection === "to left"
        ? "180"
        : gradientDirection === "to top"
        ? "270"
        : "90"
    })">
          <stop offset="0%" style="stop-color:${bcolor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${gradientColor};stop-opacity:0.8" />
        </linearGradient>
      </defs>
    `;
    backgroundFill = `url(#${gradientId})`;
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${gradientDef}
      <rect width="100%" height="100%" fill="${backgroundFill}" rx="${radius}" ry="${radius}"/>
      <text x="50%" y="50%" 
            font-family="Arial, sans-serif" 
            font-size="${fontSize}" 
            font-weight="bold"
            fill="${color}" 
            text-anchor="middle" 
            dominant-baseline="central">${initials}</text>
    </svg>
  `;
  console.log(imageType);

  if (imageType === "png") {
    // Convert SVG to PNG using sharp
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();


    return { data: buffer, contentType: "image/png" };
  }

  // Return SVG as data URL
  return {
    data:svg,
    contentType: "image/svg+xml",
  };
}
