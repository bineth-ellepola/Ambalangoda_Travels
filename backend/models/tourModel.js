const mongoose = require("mongoose");

const itineraryItemSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    details: { type: String, default: "" },
  },
  { _id: false }
);

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Day Tour", "Round Tour", "Excursion", "Transfer"],
      default: "Day Tour",
    },

    duration: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    highlights: [String],

    includes: [String],

    itinerary: [itineraryItemSchema],

    image: String,

    imageId: String,

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tour", tourSchema);
