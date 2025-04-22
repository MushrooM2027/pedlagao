const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const Users = require('./Users');
const PlantationRequest = require('./PlantationRequest');

const RequestFullfillment = sequelize.define('RequestFullfillment', {
    FullfillId: {
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
    RequestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PlantationRequest,
            key: 'RequestId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    Media: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Deadline:{
        type: DataTypes.DATE,
        allowNull:false
    }
}, {
    tableName: 'RequestFullfillment',
    timestamps: true
});

module.exports = RequestFullfillment;