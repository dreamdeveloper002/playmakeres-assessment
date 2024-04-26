import Router from "express";
const router = Router();
import badgeProcessingController from "./badgeProcessing.controller.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

/**
 * badge process module Test
 * @name   get
 * @route  GET api/v1/badge-processing/health-check
 * @desc   Test badge processing module
 * @api    public
 * @param  {String} / forward slash
 * @return {Object} Message
 */
router.get("/health-check", (req, res) => {
  res
    .status(200)
    .json({
      message: `badge processing module working on ${process.env.APP_NAME}`,
    });
});

/**
 * Convert Badge
 * @name   convert badge route
 * @route  POST api/v1/badge-processing/convert
 * @desc   User's convert badge
 * @api    public
 * @param  {String} / forward slash
 * @return {Object} Message
 */
router.post(
  "/convert",
  upload.single("file"),
  badgeProcessingController.convertBadge
);

/**
 * Upload badge
 * @name   uploadnbadge route
 * @route  POST api/v1/badge-processing/upload
 * @desc   User's upload badge
 * @api    public
 * @param  {String} / forward slash
 * @return {Object} Message
 */
router.post(
  "/upload",
  upload.single("file"),
  badgeProcessingController.uploadBadge
);

export default router;
