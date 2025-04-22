const sequelize = require('../Config/db');
const { DataTypes } = require("sequelize");
const Users = require('./Users');
const Posts = require('./Posts');

const Like = sequelize.define('Like', {
    LikeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Posts,
            key: 'PostId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserId'
        }
    }
}, {
    tableName: 'Likes',
    timestamps: true
});

module.exports = Like;
