const sequelize = require('../config/database');
const { ValidatePriviledge } = require('../helpers/validation');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const crypto = require('crypto')

module.exports = {
  GetFollowCount: async (req, res) => {
    try {
      let { user_id } = req.body;
      let followers = await models.Followers.count({
        where: {
          following_id: user_id,
        },
      });

      res.status(200).json({
        followers: followers,
      });
    } catch (error) {
      res.status(500).json({
        messsage: error,
      });
    }
  },
  Follow: async (req, res) => {
    let { follower_id, following_id } = req.body;
    if (ValidatePriviledge(req, following_id)) {
      try {
        await models.Followers.create({
          follow_id: crypto.randomUUID(),
          follower_id: follower_id,
          following_id: following_id,
        });

        res.status(201).json({
          message: 'follow created',
        });
      } catch (error) {
        res.status(500).json({
          message: error,
        });
      }
    } else {
      res.status(401).json({
        message: 'unauthorized',
      });
    }
  },
  Unfollow: async (req, res) => {
    let { follower_id, following_id } = req.body;
    if (ValidatePriviledge(req, follower_id)) {
      try {
        await models.Followers.destroy({
          where: {
            follower_id: follower_id,
            following_id: following_id,
          },
        });
      } catch (error) {
        res.status(500).json({
          message: error,
        });
      }
    } else {
      res.status(401).json({
        message: 'unauthorized',
      });
    }
  },
};
