const express = require('express');
const router = express.Router();
const PostService = require('../Services/postService');
const upload = require('../Utils/multer')

// POST /post - create a new post with multiple media files
router.post('/post', upload.array('postMedia', 10), async (req, res) => {
    try {
        const { UserId, Description } = req.body;
        const files = req.files;

        console.log('Body:', req.body);
        console.log('Files:', files);

        // Create post
        const newPost = await PostService.createPost({ UserId, Description });

        // Save uploaded media in MediaFiles table if you have one
        if (files && files.length > 0) {
            const mediaEntries = files.map(file => ({
                referenceId: newPost.PostId,
                referenceType: 'Post',
                filePath: `/uploads/posts/${file.filename}`,
            }));

            const MediaFile = require('../Models/MediaFiles');
            await MediaFile.bulkCreate(mediaEntries);
        }

        res.status(201).json(newPost);
    } catch (err) {
        console.error('Failed to create post:', err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});


router.get('/feed', async (req, res) => {
    try {
        const posts = await PostService.getFeedPosts();
        // console.log('Fetched Posts:', posts);
        res.json(posts);
    } catch (error) {
        console.error("Error fetching feed posts:", error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

module.exports = router;
