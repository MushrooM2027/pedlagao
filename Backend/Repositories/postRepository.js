const MediaFile = require('../Models/MediaFiles');
const Post = require('../Models/Post');
const Users = require('../Models/Users');

const PostRepository = {
    getAllPostsWithUsers: async () => {
        return await Post.findAll({
            include: [{
                model: Users,
                attributes: ['UserId', 'Name', 'ProfilePicture']
            },
            {
                model: MediaFile,
                as:'MediaFiles', // your image model
                attributes: ["filePath"]
            }],
            order: [['createdAt', 'DESC']]
        });
    }
};

module.exports = PostRepository;
