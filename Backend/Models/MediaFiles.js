const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const MediaFile = sequelize.define('MediaFile', {
  MediaId: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  filePath: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  mimeType: { 
    type: DataTypes.STRING 
  },
  referenceId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  referenceType: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
}, {
  tableName: 'MediaFiles',
  timestamps: true
});

module.exports = MediaFile;
