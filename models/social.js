const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Profile = require('../models/profile');

const Social = sequelize.define('Social', {
  youtube: { type: DataTypes.STRING },
  twitter: { type: DataTypes.STRING },
  facebook: { type: DataTypes.STRING },
  linkedin: { type: DataTypes.STRING },
  instagram: { type: DataTypes.STRING },
  reddit: { type: DataTypes.STRING },
});

Social.belongsTo(Profile, { foreignKey: 'profileId', as: 'profile' });

module.exports = Social;
