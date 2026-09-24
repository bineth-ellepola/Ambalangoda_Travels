const express = require("express");
const router = express.Router();

const { createUpload } = require("../middleware/upload");
const { requireAdmin } = require("../middleware/auth");
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require("../controller/tourController");

const upload = createUpload("tours");

router.get("/", getTours);
router.get("/:id", getTour);

router.post("/", requireAdmin, upload.single("image"), createTour);
router.put("/:id", requireAdmin, upload.single("image"), updateTour);
router.delete("/:id", requireAdmin, deleteTour);

module.exports = router;
