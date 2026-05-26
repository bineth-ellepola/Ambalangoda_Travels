const Discription = require("../models/discriptionModel");

const createDiscription = async (req, res) => {
  try {
    const newDiscription = new Discription({
      title: req.body.title,
      description: req.body.description,
      image: req.file.path,
    });

    await newDiscription.save();

    res.status(201).json(newDiscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDiscription };