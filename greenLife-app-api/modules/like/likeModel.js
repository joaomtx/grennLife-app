const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/userModel');
const Video = require('../video/videoModel');

const Like = sequelize.define('Like', {});

Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Video, { foreignKey: 'videoId' });
User.hasMany(Like, { foreignKey: 'userId' });
Video.hasMany(Like, { foreignKey: 'videoId' });

module.exports = Like;
