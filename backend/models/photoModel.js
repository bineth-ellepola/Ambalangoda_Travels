const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Photo', photoSchema);