import asyncHandler from "express-async-handler";
import badgeProcessingService from "./badgeProcessing.service.js";

const badgeProcessingController = {
  uploadBadge: asyncHandler(async (req, res) => {
    if (!req.file) {
      console.log("No file uploaded.");
      return res.status(400).send({ message: "No file uploaded." });
    }

    try {
      const result = await badgeProcessingService.uploadBadgeService(
        req.file.path
      );
      res.status(200).json({ message: result });
    } catch (error) {
      console.error("Error processing badge:", error);
      res.status(400).json({ message: "Error processing badge" });
    }
  }),

  convertBadge: asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded." });
    }

    try {
      await badgeProcessingService.convertBadgeService(req, res);
      res
        .status(200)
        .json({ message: "File converted and uploaded successfully" });
    } catch (error) {
      console.error("Error processing badge:", error);
      res.status(400).json({ message: "Error processing badge" });
    }
  }),
};

export default badgeProcessingController;
