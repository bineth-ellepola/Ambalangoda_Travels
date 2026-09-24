const Tour = require("../models/tourModel");
const { destroyImage } = require("../utils/cloudinaryCleanup");

// Admin forms send lists as newline-separated text and the itinerary as JSON
const toList = (value) => {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value !== "string") return undefined;
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const toItinerary = (value) => {
  if (value === undefined) return undefined;
  const items = typeof value === "string" ? JSON.parse(value || "[]") : value;
  return items
    .filter((item) => item && item.title)
    .map((item, index) => ({
      day: Number(item.day) || index + 1,
      title: item.title,
      details: item.details || "",
    }));
};

const buildTourData = (body) => {
  const data = {};
  const fields = ["title", "category", "duration", "price", "location", "summary", "description"];

  fields.forEach((field) => {
    if (body[field] !== undefined) data[field] = body[field];
  });

  if (body.featured !== undefined) {
    data.featured = body.featured === true || body.featured === "true";
  }

  const highlights = toList(body.highlights);
  if (highlights) data.highlights = highlights;

  const includes = toList(body.includes);
  if (includes) data.includes = includes;

  const itinerary = toItinerary(body.itinerary);
  if (itinerary) data.itinerary = itinerary;

  return data;
};

const errorStatus = (error) =>
  error.name === "ValidationError" || error.name === "CastError" || error instanceof SyntaxError
    ? 400
    : 500;

const getTours = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.featured === "true") filter.featured = true;

    const tours = await Tour.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.json(tour);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(500).json({ message: error.message });
  }
};

const createTour = async (req, res) => {
  try {
    const data = buildTourData(req.body);

    if (req.file) {
      data.image = req.file.path;
      data.imageId = req.file.filename;
    }

    const tour = await Tour.create(data);
    res.status(201).json(tour);
  } catch (error) {
    if (req.file) await destroyImage(req.file.filename);
    res.status(errorStatus(error)).json({ message: error.message });
  }
};

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      if (req.file) await destroyImage(req.file.filename);
      return res.status(404).json({ message: "Tour not found" });
    }

    const oldImageId = tour.imageId;
    tour.set(buildTourData(req.body));

    if (req.file) {
      tour.image = req.file.path;
      tour.imageId = req.file.filename;
    }

    await tour.save();

    if (req.file && oldImageId) await destroyImage(oldImageId);

    res.json(tour);
  } catch (error) {
    if (req.file) await destroyImage(req.file.filename);
    res.status(errorStatus(error)).json({ message: error.message });
  }
};

const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    await destroyImage(tour.imageId);
    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(errorStatus(error)).json({ message: error.message });
  }
};

module.exports = { getTours, getTour, createTour, updateTour, deleteTour };
