const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { requireAdmin } = require("../middleware/auth");
const {
  getDiscriptions,
  createDiscription,
  updateDiscription,
  deleteDiscription,
} = require("../controller/discriptionController");

router.get("/", getDiscriptions);

router.post(
  "/add",
  requireAdmin,
  upload.single("image"),
  createDiscription
);

router.put("/:id", requireAdmin, upload.single("image"), updateDiscription);

router.delete("/:id", requireAdmin, deleteDiscription);

module.exports = router;
