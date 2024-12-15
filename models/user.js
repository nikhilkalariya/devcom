const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      githubusername: {
        type: DataTypes.STRING,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
  module.exports ={User};
  