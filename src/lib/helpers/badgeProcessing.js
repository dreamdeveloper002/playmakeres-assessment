import sharp from "sharp";

const radius = 256; // Radius touching the edges
const tolerance = 2; // Increased tolerance for edge pixels


const isPixelInsideCircle = (x, y, centerX, centerY, radius) => {
  const dx = x - centerX;
  const dy = y - centerY;
  return dx * dx + dy * dy <= (radius + tolerance) * (radius + tolerance);
};



const checkPixels = (data, width, height) => {
  const centerX = width / 2;
  const centerY = height / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Assume RGBA data
      const idx = (width * y + x) * 4;
      if (data[idx + 3] !== 0) {
        // check if pixel is not transparent
        if (!isPixelInsideCircle(x, y, centerX, centerY, radius)) {
          console.log(
            `Pixel at (${x}, ${y}) is outside the designated circle.`
          );
          return `Pixel at (${x}, ${y}) is outside the designated circle.`;
        }
        if (data[idx] < 128 || data[idx + 1] < 128 || data[idx + 2] < 128) {
            return "Colors are not bright enough to give a happy feeling.";
        }
      }
    }
  }
  return "All checks passed. The image fits the criteria.";
};



export const verifyBadge = async (filePath) => {
    try {
        const { data, info } = await sharp(filePath)
            .ensureAlpha()
            .resize(512, 512)
            .raw()
            .toBuffer({ resolveWithObject: true });

        const result = checkPixels(data, info.width, info.height);
        if (result !== "All checks passed. The image fits the criteria.") {
            throw new Error(result);
        }
        console.log("The badge is valid.");
        return "The badge is valid.";
    } catch (error) {
        console.error("Error processing badge:", error);
        throw error;
    }
};



export const convertToBadge = async (inputFilePath, outputFilePath) => {
  const targetSize = 512;
  const mask = Buffer.from(
    '<svg><circle cx="256" cy="256" r="256" fill="#FFF"/></svg>'
  );

  try {
    // Load the image using sharp
    const image = sharp(inputFilePath);

    // Retrieve metadata to check dimensions
    const metadata = await image.metadata();

    // Determine the resizing strategy based on original dimensions
    const resizeOptions = {
      width: targetSize,
      height: targetSize,
      fit:
        metadata.width === metadata.height ? sharp.fit.fill : sharp.fit.cover,
      position: sharp.strategy.entropy,
    };

    await image
      .resize(resizeOptions)
      .composite([
        {
          input: mask,
          blend: "dest-in",
        },
      ])
      .toFormat("png")
      .toFile(outputFilePath);
    console.log("Image has been converted and saved at 512x512 pixels.");
  } catch (error) {
    console.error("Error converting image:", error);
  }
};
