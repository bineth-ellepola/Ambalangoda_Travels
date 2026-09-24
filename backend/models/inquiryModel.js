const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    phone: {
      type: String,
      default: "",
    },

    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },

    tourTitle: {
      type: String,
      default: "",
    },

    travelDate: Date,

    guests: {
      type: Number,
      min: 1,
      default: 1,
    },

    message: {
      type: String,
      required: true,
      maxlength: 3000,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
