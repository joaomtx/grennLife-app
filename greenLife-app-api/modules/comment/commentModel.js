const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/userModel');
const Video = require('../video/videoModel');

const Comment = sequelize.define('Comment', {
    content: { type: DataTypes.TEXT, allowNull: false }
});

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Video, { foreignKey: 'videoId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Video.hasMany(Comment, { foreignKey: 'videoId' });

module.exports = Comment;
