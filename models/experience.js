const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Profile = require('../models/profile');

const Experience = sequelize.define('Experience', {
  title: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  from: { type: DataTypes.DATE, allowNull: false },
  to: { type: DataTypes.DATE },
  current: { type: DataTypes.BOOLEAN, defaultValue: false },
  description: { type: DataTypes.STRING },
});

Experience.belongsTo(Profile, { foreignKey: 'profileId', as: 'profile' });

module.exports = Experience;
