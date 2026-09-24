const express = require("express");
const router = express.Router();

const { createUpload } = require("../middleware/upload");
const { requireAdmin } = require("../middleware/auth");
const {
  getPhotos,
  addMultiplePhotos,
  deletePhoto,
} = require("../controller/photoController");

const upload = createUpload("gallery");

router.get("/", getPhotos);
router.post("/", requireAdmin, upload.array("images", 20), addMultiplePhotos);
router.delete("/:id", requireAdmin, deletePhoto);

module.exports = router;
