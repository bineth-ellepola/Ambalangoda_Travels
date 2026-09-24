const cloudinary = require("../config/cloudinary");

// Best-effort removal of an uploaded image; a failure here should never block the request
const destroyImage = async (imageId) => {
  if (!imageId) return;
  try {
    await cloudinary.uploader.destroy(imageId);
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
  }
};

module.exports = { destroyImage };
