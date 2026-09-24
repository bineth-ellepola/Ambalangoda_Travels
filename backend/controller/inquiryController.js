const Inquiry = require("../models/inquiryModel");
const Tour = require("../models/tourModel");

const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, tour, travelDate, guests, message } = req.body;

    const data = { name, email, phone, message };

    if (travelDate) data.travelDate = travelDate;
    if (guests) data.guests = Number(guests);

    if (tour) {
      const selectedTour = await Tour.findById(tour).catch(() => null);
      if (selectedTour) {
        data.tour = selectedTour._id;
        data.tourTitle = selectedTour.title;
      }
    }

    const inquiry = await Inquiry.create(data);

    res.status(201).json({
      message: "Thank you! We will get back to you shortly.",
      id: inquiry._id,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((err) => (err.kind === "required" ? `Please enter your ${err.path}` : err.message))
        .join(". ");
      return res.status(400).json({ message });
    }
    const status = error.name === "CastError" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

const getInquiries = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInquiryStatus = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.json(inquiry);
  } catch (error) {
    const status = error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry };
