const Discription = require("../models/discriptionModel");
const { destroyImage } = require("../utils/cloudinaryCleanup");

const errorStatus = (error) =>
  error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;

const getDiscriptions = async (req, res) => {
  try {
    const discriptions = await Discription.find().sort({ createdAt: -1 });
    res.json(discriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDiscription = async (req, res) => {
  try {
    const newDiscription = new Discription({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.path : undefined,
      imageId: req.file ? req.file.filename : undefined,
    });

    await newDiscription.save();

    res.status(201).json(newDiscription);
  } catch (error) {
    if (req.file) await destroyImage(req.file.filename);
    res.status(errorStatus(error)).json({ message: error.message });
  }
};

const updateDiscription = async (req, res) => {
  try {
    const discription = await Discription.findById(req.params.id);

    if (!discription) {
      if (req.file) await destroyImage(req.file.filename);
      return res.status(404).json({ message: "Destination not found" });
    }

    const oldImageId = discription.imageId;

    if (req.body.title !== undefined) discription.title = req.body.title;
    if (req.body.description !== undefined) discription.description = req.body.description;

    if (req.file) {
      discription.image = req.file.path;
      discription.imageId = req.file.filename;
    }

    await discription.save();

    if (req.file && oldImageId) await destroyImage(oldImageId);

    res.json(discription);
  } catch (error) {
    if (req.file) await destroyImage(req.file.filename);
    res.status(errorStatus(error)).json({ message: error.message });
  }
};

const deleteDiscription = async (req, res) => {
  try {
    const discription = await Discription.findByIdAndDelete(req.params.id);

    if (!discription) {
      return res.status(404).json({ message: "Destination not found" });
    }

    await destroyImage(discription.imageId);
    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(errorStatus(error)).json({ message: error.message });
  }
};

module.exports = {
  getDiscriptions,
  createDiscription,
  updateDiscription,
  deleteDiscription,
};
