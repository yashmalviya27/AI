const postModel = require('../models/post.model');
const { generateCaption } = require('../service/ai.service')
const { upload } = require('../service/image.service')



const createPost = async (req, res) => {
    const file = req.file;
    try {
        // This is for convert image to base64
        const base64ImageFile = new Buffer.from(file.buffer).toString('base64');
        // Here I integrate AI service to generate caption.
        // This is for generat caption
        const caption = await generateCaption(base64ImageFile)
        // in this line i integrate image upload service
        const uploadedImage = await upload(file);
        const post = await postModel.create({
            image: uploadedImage.url,
            caption: caption,
            userId: req.user._id
        });
        res.json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        return res.status(500).send(error);
    }

}

module.exports = { createPost }
