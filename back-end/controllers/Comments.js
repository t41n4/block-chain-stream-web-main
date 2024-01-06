const sequelize = require('../config/database');
const { ValidatePriviledge } = require('../helpers/validation');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const crypto = require('crypto');

module.exports = {
  AddComment: async (req, res) => {
    let { comment_user, comment_video, comment_content } = req.body;
    if (ValidatePriviledge(comment_user, req)) {
      try {
        let comment_id = crypto.randomUUID();
        await models.Comments.create({
          comment_id: comment_id,
          comment_user: comment_user,
          comment_video: comment_video,
          comment_content: comment_content,
        });

        res.status(201).json({
          message: `user ${comment_user} commented ${comment_video}`,
          like_id: comment_id,
        });
      } catch (err) {
        res.status(500).json({
          message: err.errors.message,
        });
      }
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  },
  RemoveComment: async (req, res) => {
    let id = req.params.id;
    if (ValidatePriviledge(id, req)) {
      try {
        await models.Comments.destroy({
          where: {
            comment_id: id,
          },
        });
      } catch (err) {
        res.status(500).json({
          message: err.errors.message,
        });
      }
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  },
  RealtimeComment: (req, res) => {
    let { username, message } = req.body;
    global.io.emit(`comment_${username}`, message);
    res.status(200).json({});
  },
};
