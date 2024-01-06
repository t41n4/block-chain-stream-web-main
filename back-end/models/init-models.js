var DataTypes = require('sequelize').DataTypes;
var _Comments = require('./Comments');
var _Followers = require('./Followers');
var _Likes = require('./Likes');
var _Notifications = require('./Notifications');
var _Site_Setting = require('./Site_Setting');
var _Users = require('./Users');
var _Videos = require('./Videos');

function initModels(sequelize) {
  var Comments = _Comments(sequelize, DataTypes);
  var Followers = _Followers(sequelize, DataTypes);
  var Likes = _Likes(sequelize, DataTypes);
  var Notifications = _Notifications(sequelize, DataTypes);
  var Site_Setting = _Site_Setting(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var Videos = _Videos(sequelize, DataTypes);

  Comments.belongsTo(Users, {
    as: 'comment_user_User',
    foreignKey: 'comment_user',
  });
  Users.hasMany(Comments, { as: 'Comments', foreignKey: 'comment_user' });
  Followers.belongsTo(Users, { as: 'follower', foreignKey: 'follower_id' });
  Users.hasMany(Followers, { as: 'Followers', foreignKey: 'follower_id' });
  Followers.belongsTo(Users, { as: 'following', foreignKey: 'following_id' });
  Users.hasMany(Followers, {
    as: 'following_Followers',
    foreignKey: 'following_id',
  });
  Likes.belongsTo(Users, { as: 'like_user_User', foreignKey: 'like_user' });
  Users.hasMany(Likes, { as: 'Likes', foreignKey: 'like_user' });
  Notifications.belongsTo(Users, {
    as: 'notification_user_User',
    foreignKey: 'notification_user',
  });
  Users.hasMany(Notifications, {
    as: 'Notifications',
    foreignKey: 'notification_user',
  });
  Videos.belongsTo(Users, {
    as: 'Owners',
    foreignKey: 'video_owner',
  });
  Users.hasMany(Videos, { as: 'Videos', foreignKey: 'video_owner' });
  Comments.belongsTo(Videos, {
    as: 'comment_video_Video',
    foreignKey: 'comment_video',
  });
  Videos.hasMany(Comments, { as: 'Comments', foreignKey: 'comment_video' });
  Likes.belongsTo(Videos, { as: 'like_video_Video', foreignKey: 'like_video' });
  Videos.hasMany(Likes, { as: 'Likes', foreignKey: 'like_video' });

  return {
    Comments,
    Followers,
    Likes,
    Notifications,
    Site_Setting,
    Users,
    Videos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
