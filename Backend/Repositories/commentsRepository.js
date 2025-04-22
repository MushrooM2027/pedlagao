const { Op } = require('sequelize');
const Comment = require('../Models/Comments');
const Users = require('../Models/Users');
const MediaFiles = require('../Models/MediaFiles')

// Comment Repository
const CommentRepository = {
  // Create a new comment
  create: async (data) => {
    return await Comment.create({
      PostId: data.PostId,
      UserId: data.UserId,
      Content: data.Content,
    });
  },

  // Get all comments for a specific post
  getByPostId: async (postId) => {
    try {
      console.log('Querying comments for postId:', postId);

      // Querying comments with the associated user and media (profile picture)
      const comments = await Comment.findAll({
        where: { PostId: postId },
        include: [
          {
            model: Users,
            as: 'commenter',
            attributes: ['UserId', 'Username'], // Include necessary user attributes
            include: {
              model: MediaFiles,
              as: 'profileMedia',  // Assuming 'profilePicture' is the alias you want for the media files
              where: { referenceType: 'User' },  // Filter to get only profile pictures
              required: false, // Include the media even if there's no profile picture
              attributes: ['filePath'],  // Only include the filePath from the MediaFile model
            }
          }
        ],
        order: [['createdAt', 'ASC']],
      });

      console.log('Fetched comments:', comments);
      return comments;
    } catch (err) {
      console.error('Error querying comments:', err);
      throw err;
    }
  },

  // Get comment by ID
  getById: async (id) => {
    return await Comment.findByPk(id);
  },

  // Delete a comment by ID
  delete: async (id) => {
    return await Comment.destroy({ where: { CommentId: id } });
  },
};

module.exports = CommentRepository;
