const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');
const { createPost } = require('../controllers/post.controller');

const upload = multer({ storage: multer.memoryStorage() });


router.post('/', authMiddleware, upload.single('image'), createPost)



module.exports = router