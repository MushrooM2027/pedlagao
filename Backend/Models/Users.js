const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const User = sequelize.define('User', {
    UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    PasswordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    City: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Coins : {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue : 1000
    } 
}, {
    tableName: 'Users',
    timestamps: true
});

module.exports = User;