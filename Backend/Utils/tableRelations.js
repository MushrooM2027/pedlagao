const Post = require('../Models/Posts');
const Like = require('../Models/Likes');
const Comment = require('../Models/Comments');
const Users = require('../Models/Users');
const MediaFile = require('../Models/MediaFiles');
const PlantationRequest = require('../Models/PlantationRequest');
const RequestFullfillment = require('../Models/RequestFullfillment')

// 1. User and PlantationRequest
Users.hasMany(PlantationRequest, { foreignKey: 'UserId', as: 'requests' });
PlantationRequest.belongsTo(Users, { foreignKey: 'UserId', as: 'user' });

PlantationRequest.hasOne(RequestFullfillment, { foreignKey: 'RequestId', as: 'fulfillment' });
RequestFullfillment.belongsTo(PlantationRequest, { foreignKey: 'RequestId', as: 'plantationRequest' });

// 3. User and RequestFullfillment
Users.hasMany(RequestFullfillment, { foreignKey: 'UserId', as: 'userFulfillments' });
RequestFullfillment.belongsTo(Users, { foreignKey: 'UserId', as: 'user' });

// RequestFullfillment.belongsTo(User, { foreignKey: 'UserId', as: 'user' });
// RequestFullfillment.belongsTo(PlantationRequest, { foreignKey: 'RequestId', as: 'plantationRequest' });

Post.belongsTo(Users, { foreignKey: 'UserId', as: 'author' });
Post.hasMany(Comment, { foreignKey: 'PostId', as: 'comments' });
Post.hasMany(Like, { foreignKey: 'PostId', as: 'likes' });

Comment.belongsTo(Post, { foreignKey: 'PostId' });
Comment.belongsTo(Users, { foreignKey: 'UserId', as: 'commenter' });

Like.belongsTo(Post, { foreignKey: 'PostId' });
Like.belongsTo(Users, { foreignKey: 'UserId', as: 'liker' });

Users.hasMany(Post, { foreignKey: 'UserId' });
Users.hasMany(Comment, { foreignKey: 'UserId' });
Users.hasMany(Like, { foreignKey: 'UserId' });

Post.hasMany(MediaFile, {
    foreignKey: 'referenceId',
    constraints: false,
    scope: {
        referenceType: 'Post', // lowercase or as you're storing it in DB
    },
    as: 'postMedia' // alias to use in include
});

MediaFile.belongsTo(Post, {
    foreignKey: 'referenceId',
    constraints: false,
});

MediaFile.belongsTo(Users, {
    foreignKey: 'referenceId',
    constraints: false,
    as: 'profileMedia'
}
);
Users.hasOne(MediaFile, {
    foreignKey: 'referenceId',
    constraints: false,
    scope: {
        referenceType: 'User'
    },
    as: 'profileMedia'
});

MediaFile.belongsTo(RequestFullfillment, {
    foreignKey: 'referenceId',
    constraints: false,
    as: 'fulfillmentMedia'
});

RequestFullfillment.hasMany(MediaFile, {
    foreignKey: 'referenceId',
    constraints: false,
    scope: {
        referenceType: 'RequestFullfillment'
    },
    as: 'fulfillmentMedia'
});

MediaFile.belongsTo(PlantationRequest, {
    foreignKey: 'referenceId',
    constraints: false,
    as: 'plantationMedia'
});

PlantationRequest.hasMany(MediaFile, {
    foreignKey: 'referenceId',
    constraints: false,
    scope: {
        referenceType: 'PlantationRequest'
    },
    as: 'plantationMedia'
});
