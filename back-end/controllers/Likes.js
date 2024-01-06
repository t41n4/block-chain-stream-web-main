const sequelize = require('../config/database');
const { ValidatePriviledge } = require('../helpers/validation');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const crypto = require('crypto');

module.exports = {
  AddLike: async (req, res) => {
    let { like_user, like_video } = req.body;
    if (ValidatePriviledge(req, like_user)) {
      try {
        let like_id = crypto.randomUUID();
        await models.Likes.create({
          like_id: like_id,
          like_user: like_user,
          like_video: like_video,
        });

        let user = await models.Users.findOne({
          where: {
            user_id: like_user,
          },
        });

        global.io.emit(`like_${user.username}`, () => {});

        res.status(201).json({
          message: `user ${like_user} liked ${like_video}`,
          like_id: like_id,
        });
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  },
  RemoveLike: async (req, res) => {
    let id = req.params.id;
    console.log(id)
    let like = await models.Likes.findOne({
      where: {
        like_id: id,
      },
    });
    console.log(like);
    if (ValidatePriviledge(req, like.like_user)) {
      try {
        await models.Likes.destroy({
          where: {
            like_id: id,
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
  GetLikeCount: async (req, res) => {
    let id = req.params.id;
    console.log(id);
    try {
      let likes = await models.Likes.count({
        where: {
          like_video: id,
        },
      });

      res.status(200).json({
        likes: likes,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },
};
