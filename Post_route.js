const express = require('express');
const multer = require('multer');
const path = require('path');
const { getPosts, createPost, likePost, addComment } = require('../controller/Post_controller.js');
const { verifyToken } = require('../controller/User_controller.js'); 
const User = require('../model/User_Model.js'); 

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', getPosts);

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (user) {
            res.json(user); 
        } else {
            res.status(404).json({ message: "Driver not found in Mainframe." });
        }
    } catch (error) {
        res.status(500).json({ message: "System Failure: Could not fetch profile." });
    }
});

router.post('/send', verifyToken, upload.single('media'), createPost);
router.put('/:id/like', verifyToken, likePost);
router.post('/:id/comment', verifyToken, addComment);

module.exports = router;