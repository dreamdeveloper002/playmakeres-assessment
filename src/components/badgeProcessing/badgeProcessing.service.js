import fs from "fs";
import asyncHandler from "express-async-handler";
import {
  convertToBadge,
  verifyBadge,
} from "../../lib/helpers/badgeProcessing.js";

const convertBadgeService = asyncHandler(async (req, res) => {
  const inputFilePath = req.file.path;
  const outputFilePath = `uploads/${req.file.filename}-converted.png`;

  try {
    await convertToBadge(inputFilePath, outputFilePath);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ message: "Failed to convert badge." });
  } finally {
    fs.unlink(inputFilePath, (err) => {
      if (err) console.error("Error removing original file:", err);
    });
  }
});

const uploadBadgeService = asyncHandler(async (filePath) => {
  try {
    const result = await verifyBadge(filePath);
    return result;
  } catch (error) {
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error removing file:", err);
    });
    throw new Error(error);
  }
});

export default {
  convertBadgeService,
  uploadBadgeService,
};
