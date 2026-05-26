const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  createDiscription,
} = require("../controllers/discriptionController");

router.post(
  "/add",
  upload.single("image"),
  createDiscription
);

module.exports = router;