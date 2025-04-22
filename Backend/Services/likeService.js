const LikeRepository = require("../Repositories/likeRepository");

const LikeService = {
    likePost: async (UserId, PostId) => {
        const existing = await LikeRepository.findLike(UserId, PostId);
        if (existing) {
            throw new Error("Post already liked by user");
        }
        return await LikeRepository.createLike(UserId, PostId);
    },

    unlikePost: async (UserId, PostId) => {
        return await LikeRepository.deleteLike(UserId, PostId);
    },

    getLikesCount: async (PostId) => {
        return await LikeRepository.countLikes(PostId);
    },
    getLike: async (UserId, PostId) => {
        return await LikeRepository.findLike(UserId, PostId);
    }

};

module.exports = LikeService;
