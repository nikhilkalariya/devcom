const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Like = sequelize.define('Like', {
  postId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

const Comment = sequelize.define('Comment', {
  postId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Post.hasMany(Comment, { foreignKey: 'postId' });
Post.hasMany(Like, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

module.exports = { Post, Like, Comment };
