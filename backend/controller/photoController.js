const Photo = require('../models/photoModel');
const { destroyImage } = require('../utils/cloudinaryCleanup');

// Get all photos
const getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find().sort({ createdAt: -1 });
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching photos', error: error.message });
    }
};

// Add multiple photos
const addMultiplePhotos = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const photos = req.files.map(file => ({
            image: file.path, // Cloudinary URL
            imageId: file.filename, // Cloudinary public_id, used for deletion
            caption: req.body.caption || '',
        }));

        const savedPhotos = await Photo.insertMany(photos);

        res.status(201).json({
            message: 'Photos uploaded successfully',
            data: savedPhotos,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading photos', error: error.message });
    }
};

// Delete a photo by ID
const deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPhoto = await Photo.findByIdAndDelete(id);

        if (!deletedPhoto) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        await destroyImage(deletedPhoto.imageId);

        res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting photo', error: error.message });
    }
};

module.exports = { getPhotos, addMultiplePhotos, deletePhoto };
