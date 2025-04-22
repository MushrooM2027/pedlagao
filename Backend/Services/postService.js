const Post = require('../Models/Posts');
const Users = require('../Models/Users');
const MediaFile = require('../Models/MediaFiles')

const createPost = async (data) => {
    return await Post.create(data);
};

const getAllPosts = async () => {
    return await Post.findAll({
        include: {
            model: Users,
            attributes: ['Name', 'ProfilePicture'],
        },
        order: [['createdAt', 'DESC']],
    });
};

const getFeedPosts = async () => {
    return await Post.findAll({
        include: [
            {
                model: Users,
                as: 'author',
                attributes: ['Name','UserId'],
                include: [
                    {
                        model: MediaFile,
                        as: 'profileMedia', // NEW alias
                        where: { referenceType: 'User' },
                        required: false,
                        attributes: ['filePath'],
                    }
                ]
            },
            {
                model: MediaFile,
                as: 'postMedia', // NEW alias
                where: { referenceType: 'Post' },
                required: false,
                attributes: ['filePath']
            }
        ],
        order: [['createdAt', 'DESC']],
    });
};


module.exports = {
    createPost,
    getAllPosts,
    getFeedPosts
};
