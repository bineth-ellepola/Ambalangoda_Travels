const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const createUpload = (folder) =>
  multer({
    storage: new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: `ambalangoda_travels/${folder}`,
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
      },
    }),
    limits: { fileSize: 8 * 1024 * 1024 },
  });

const upload = createUpload("descriptions");

module.exports = upload;
module.exports.createUpload = createUpload;
