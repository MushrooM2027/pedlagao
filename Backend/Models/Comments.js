const sequelize = require('../Config/db');
const Users = require('./Users');
const Post = require('./Posts');
const { DataTypes } = require('sequelize');

const Comment = sequelize.define('Comment', {
    CommentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'PostId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserId'
        }
    },
    Content: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Comments',
    timestamps: true
});

module.exports = Comment;
