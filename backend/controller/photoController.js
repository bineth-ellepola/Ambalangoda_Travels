const Photo = require('../models/photoModel');

// Add multiple photos
const addMultiplePhotos = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const photos = req.files.map(file => ({
            image: file.path, // Cloudinary URL
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

        res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting photo', error: error.message });
    }
};

module.exports = { addMultiplePhotos, deletePhoto };
