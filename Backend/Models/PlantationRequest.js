const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const Users = require('./Users');
const User = require('./Users');

const PlantationRequest = sequelize.define('PlantationRequest', {
    RequestId: {
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
    PlantingFor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    NameOfRequestedPerson: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    TreeType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    RequestType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    RequestedLocation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LocationImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    NumberOfTrees: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IsActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    ClaimedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model:User,
            key:"UserId"
        }
    }
}, {
    tableName: 'PlantationRequest',
    timestamps: true
});

module.exports = PlantationRequest;