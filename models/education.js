const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Profile = require('../models/profile');

const Education = sequelize.define('Education', {
  school: { type: DataTypes.STRING, allowNull: false },
  degree: { type: DataTypes.STRING, allowNull: false },
  fieldofstudy: { type: DataTypes.STRING, allowNull: false },
  from: { type: DataTypes.DATE, allowNull: false },
  to: { type: DataTypes.DATE },
  current: { type: DataTypes.BOOLEAN, defaultValue: false },
  description: { type: DataTypes.STRING },
});

Education.belongsTo(Profile, { foreignKey: 'profileId', as: 'profile' });

module.exports = Education;
