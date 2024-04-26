import { PNG } from "pngjs";
import fs from "fs";
import sharp from "sharp";

const isPixelInsideCircle = (x, y, centerX, centerY, radius) => {
  const dx = x - centerX;
  const dy = y - centerY;
  return dx * dx + dy * dy <= radius * radius;
};

const checkPixels = (data, width, height, centerX, centerY, radius) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      // If pixel is not transparent
      if (data[idx + 3] !== 0) {
        if (!isPixelInsideCircle(x, y, centerX, centerY, radius)) {
          return "Pixels are outside the designated circle.";
        }
        // Check for "happy" feeling colors
        if (data[idx] < 128 || data[idx + 1] < 128 || data[idx + 2] < 128) {
          return "Colors are not bright enough to give a happy feeling.";
        }
      }
    }
  }
  return null;
};

export const verifyBadge = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .on("error", (err) => reject("Failed to read file: " + err))
      .pipe(new PNG())
      .on("parsed", function () {
        const expectedSize = 512;
        if (this.width >= expectedSize || this.height >= expectedSize) {
          reject("Image must be 512x512 pixels.");
          return;
        }

        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = this.width / 2;

        const pixelCheckResult = checkPixels(
          this.data,
          this.width,
          this.height,
          centerX,
          centerY,
          radius
        );
        if (pixelCheckResult !== null) {
          reject(pixelCheckResult);
          return;
        }

        resolve("The badge is valid.");
      })
      .on("error", (err) =>
        reject("Invalid file signature, possibly not a PNG: " + err)
      );
  });
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
