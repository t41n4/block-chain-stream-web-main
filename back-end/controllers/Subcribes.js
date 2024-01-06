const sequelize = require('../config/database');
const { ValidatePriviledge } = require('../helpers/validation');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const crypto = require('crypto');

module.exports = {
  SubcribesToChannel: async (req, res) => {
    let { subscribe_user, subscribe_channel } = req.body;
    if (ValidatePriviledge(subscribe_user, req)) {
      try {
        let subscribe_id = crypto.randomUUID();
        await models.Subscribes.create({
          subscribe_id: subscribe_id,
          subscribe_user: subscribe_user,
          subscribe_channel: subscribe_channel,
        });

        res.status(201).json({
          message: `user ${subscribe_user} subcribed ${subscribe_channel}`,
          subscribe_id: subscribe_id,
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
        await models.Subscribes.destroy({
          where: {
            subscribe_id: id,
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
};
