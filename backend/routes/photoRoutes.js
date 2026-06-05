const express = require('express');
const router = express.Router();    

const upload = require('../middleware/upload');
const {
    createPhoto,
} = require('../controllers/photoController');  
router.post(
    '/add',
    upload.single('image'),
    createPhoto
);  
module.exports = router;