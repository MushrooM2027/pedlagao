const express = require('express');
const router = express.Router();
const commentService = require('../Services/commentsService');

// Create a new comment
router.post('/comments', async (req, res) => {
  try {
    const { PostId, UserId, Content } = req.body;

    if (!PostId || !UserId || !Content) {
      return res.status(400).json({ error: 'PostId, UserId, and Content are required' });
    }

    const newComment = await commentService.createComment({ PostId, UserId, Content });
    return res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (err) {
    console.error('Error creating comment:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all comments for a specific post
router.get('/comments/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.getCommentsByPostId(postId);
    return res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a comment by ID
router.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await commentService.deleteComment(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
