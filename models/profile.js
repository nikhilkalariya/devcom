const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/user');
const Experience = require('../models/experience');
const Education = require('../models/education');

const Profile = sequelize.define('Profile', {
  company: { type: DataTypes.STRING },
  website: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, allowNull: false },
  skills: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
  bio: { type: DataTypes.STRING },
  githubusername: { type: DataTypes.STRING },
  social: { type: DataTypes.JSON },
});
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Profile.hasMany(Experience, { foreignKey: 'profileId' });
Profile.hasMany(Education, { foreignKey: 'profileId' });

Experience.belongsTo(Profile, { foreignKey: 'profileId' });
Education.belongsTo(Profile, { foreignKey: 'profileId' });


module.exports = Profile;
