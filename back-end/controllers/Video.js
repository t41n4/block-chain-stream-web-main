const sequelize = require('../config/database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const dotenv = require('dotenv');
const { ValidatePriviledge } = require('../helpers/validation');
const axios = require('axios');
const STREAM_DOMAIN = process.env.STREAM_DOMAIN;
const crypto = require('crypto');
dotenv.config();

module.exports = {
  CreateVideo: async (req, res) => {
    let { video_name, video_type, video_owner, video_status, video_thumbnail } =
      req.body;
    let checkStatus = await axios({
      method: 'get',
      url: `http://${STREAM_DOMAIN}:3333/liveUp/${video_owner}`,
    });
    console.log(checkStatus.data.status);
    if (ValidatePriviledge(req, video_owner)) {
      if (checkStatus.data.status) {
        try {
          let video_id = crypto.randomUUID();
          await models.Videos.create({
            video_id: video_id,
            video_name: video_name,
            video_urls: `https://${process.env.STREAM_DOMAIN}/live/${video_owner}.m3u8`,
            video_type: video_type,
            video_status: video_status,
            video_views: 0,
            video_thumbnail: video_thumbnail
              ? video_thumbnail
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1rta2lwSUnj0OiSS7Ist-MFgmmfoYQ1i71Lq0_J1HfFdSTLNPyBgh_EeQYPteIVI3qbE&usqp=CAU',
            video_owner: video_owner,
          });

          res.status(201).json({
            message: 'stream created',
            video_id: video_id,
          });
        } catch (err) {
          res.status(500).json({
            message: err.message,
          });
        }
      } else {
        res.status(403).json({
          message: 'Please wait for the preview to up first',
        });
      }
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  },
  PreviewUpdate: async (req, res) => {
    let user_id = req.body.user_id;
    let user = await models.Users.findOne({
      where: {
        user_id: user_id,
      },
    });
    if (user) {
      global.io.emit(
        `preview_${user_id}`,
        `https://${process.env.STREAM_DOMAIN}/live/${user_id}.m3u8`
      );
    }
  },
  GetVideo: async (req, res) => {
    let id = req.params.id;

    try {
      let video = await models.Videos.findAll({
        where: {
          video_id: id,
        },
        include: {
          model: models.Users,
          as: 'Owners',
          attributes: {
            exclude: ['password'],
          },
        },
      });

      res.status(200).json({
        message: 'success',
        video: video,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  },
  IncreaseView: async (req, res) => {
    let id = req.params.id;
    try {
      const updatedRows = await models.Videos.increment('video_views', {
        where: { video_id: id },
        by: 1,
      });

      res.status(204).json({
        user: updatedRows,
      });
    } catch (err) {
      res.status(500).json({
        message: err.errors[0].message,
      });
    }
  },
  DecreaseView: async (req, res) => {
    let id = req.params.id;
    try {
      const updatedRows = await models.Videos.increment('video_views', {
        where: { video_id: id },
        by: -1,
      });

      res.status(204).json({
        user: updatedRows,
      });
    } catch (err) {
      res.status(500).json({
        message: err.errors[0].message,
      });
    }
  },
  UpdateVideo: async (req, res) => {
    let id = req.params.id;
    let { video_owner } = req.body;
    if (ValidatePriviledge(req, video_owner)) {
      try {
        const updatedRows = await models.Videos.update(req.body, {
          where: { video_id: id },
        });

        res.status(204).json({
          user: updatedRows,
        });
      } catch (err) {
        res.status(500).json({
          message: err.errors[0].message,
        });
      }
    }
  },
  SuddenTerminate: async (req, res) => {
    let id = req.params.id;
    try {
      await models.Videos.destroy({
        where: { video_owner: id },
      });

      res.status(200).json({
        message: 'live stream crashed',
      });
    } catch (err) {
      res.status(500).json({
        message: err.errors[0].message,
      });
    }
  },
  DeleteVideo: async (req, res) => {
    let id = req.params.id;
    let { video_owner } = req.body;
    if (ValidatePriviledge(req, video_owner)) {
      try {
        let query = {
          where: { video_id: id },
        };
        const video = await models.Videos.findOne(query);
        if (video.video_type !== 'stream') {
          await models.Videos.destroy(query);
        }

        res.status(200).json({
          message: 'video deleted',
        });
      } catch (err) {
        res.status(500).json({
          message: err.errors[0].message,
        });
      }
    }
  },
  GetStream: async (req, res) => {
    let id = req.params.id;

    try {
      let video = await models.Videos.findOne({
        where: {
          video_owner: id,
          video_type: 'stream',
        },
        include: {
          model: models.Users,
          as: 'Owners',
          attributes: {
            exclude: ['password'],
          },
        },
      });

      res.status(200).json({
        message: 'success',
        stream: video,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    }
  },
  GetStreams: async (req, res) => {
    try {
      let streams = await models.Videos.findAll({
        where: {
          video_type: 'stream',
        },
        order: [['video_views', 'DESC']],
        include: {
          model: models.Users,
          as: 'Owners',
          attributes: {
            exclude: ['password', 'user_stream_key', 'user_id', 'user_role'],
          },
        },
      });

      res.status(200).json({
        streams: streams,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  },
};
