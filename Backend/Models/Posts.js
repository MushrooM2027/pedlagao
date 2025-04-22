const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const Users = require('./Users');

const Post = sequelize.define('Post', {
    PostId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Media: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    HashTags: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'Posts',
    timestamps: true
});

module.exports = Post;