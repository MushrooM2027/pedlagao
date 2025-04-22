const CommentRepository = require('../Repositories/commentsRepository');

const commentService = {
    // Create a new comment
    createComment: async (data) => {
        try {
            const newComment = await CommentRepository.create(data);
            return newComment;
        } catch (err) {
            throw new Error('Error creating comment: ' + err.message);
        }
    },

    // Get all comments for a post
    getCommentsByPostId: async (postId) => {
        try {
            console.log('Fetching comments for postId:', postId);
            const comments = await CommentRepository.getByPostId(postId);
            console.log('Comments fetched:', comments);
            return comments;
        } catch (err) {
            console.error('Error fetching comments:', err);
            throw new Error('Error fetching comments: ' + err.message);
        }
    },

    // Delete a comment by ID
    deleteComment: async (id) => {
        try {
            const deleted = await CommentRepository.delete(id);
            return deleted;
        } catch (err) {
            throw new Error('Error deleting comment: ' + err.message);
        }
    },
};

module.exports = commentService;
