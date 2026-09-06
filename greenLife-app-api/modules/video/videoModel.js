const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/userModel');

const Video = sequelize.define('Video', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    videoPath: { type: DataTypes.STRING, allowNull: false },
    thumbnailPath: { type: DataTypes.STRING, allowNull: false },
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    likesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    commentsCount: { type: DataTypes.INTEGER, defaultValue: 0 }
});

Video.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Video, { foreignKey: 'userId' });

module.exports = Video;
