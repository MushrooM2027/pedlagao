const express = require("express");
const router = express.Router();
const LikeService = require('../Services/likeService');

// POST /api/likes
router.post("/", async (req, res) => {
    const { UserId, PostId } = req.body;

    if (!UserId || !PostId) {
        return res.status(400).json({ message: "UserId and PostId are required" });
    }

    try {
        const newLike = await LikeService.likePost(UserId, PostId);
        res.status(201).json(newLike);
    } catch (error) {
        if (error.message === "Post already liked by user") {
            return res.status(409).json({ message: error.message });
        }
        console.error("Error creating like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE /api/likes
router.delete("/", async (req, res) => {
    const { UserId, PostId } = req.body;

    if (!UserId || !PostId) {
        return res.status(400).json({ message: "UserId and PostId are required" });
    }

    try {
        await LikeService.unlikePost(UserId, PostId);
        res.status(200).json({ message: "Like removed successfully" });
    } catch (error) {
        console.error("Error removing like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET /api/likes/check?UserId=30&PostId=2
router.get("/check", async (req, res) => {
    const { UserId, PostId } = req.query;

    if (!UserId || !PostId) {
        return res.status(400).json({ message: "UserId and PostId are required" });
    }

    try {
        const like = await LikeService.getLike(parseInt(UserId), parseInt(PostId));
        res.status(200).json({ liked: !!like });
    } catch (error) {
        console.error("Error checking like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
