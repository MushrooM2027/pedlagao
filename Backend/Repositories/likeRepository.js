const Like = require('../Models/Likes')

const LikeRepository = {
    findLike: async (UserId, PostId) => {
        return await Like.findOne({ where: { UserId, PostId } });
    },

    createLike: async (UserId, PostId) => {
        return await Like.create({ UserId, PostId });
    },

    deleteLike: async (UserId, PostId) => {
        return await Like.destroy({ where: { UserId, PostId } });
    },

    countLikes: async (PostId) => {
        return await Like.count({ where: { PostId } });
    },
    findLike: async (UserId, PostId) => {
        return await Like.findOne({ where: { UserId, PostId } });
    }

};

module.exports = LikeRepository;
