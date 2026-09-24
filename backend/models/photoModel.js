const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        imageId: {
            type: String,
        },
        caption: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Photo', photoSchema);
