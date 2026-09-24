const express = require("express");
const router = express.Router();

const { requireAdmin } = require("../middleware/auth");
const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controller/inquiryController");

router.post("/", createInquiry);

router.get("/", requireAdmin, getInquiries);
router.patch("/:id", requireAdmin, updateInquiryStatus);
router.delete("/:id", requireAdmin, deleteInquiry);

module.exports = router;
