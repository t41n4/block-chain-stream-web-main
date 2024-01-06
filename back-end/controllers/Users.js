const sequelize = require('../config/database');
const initModels = require('../models/init-models');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const models = initModels(sequelize);
const jwt = require('jsonwebtoken');
const { ValidatePriviledge } = require('../helpers/validation');
const uniqueNamesGenerator = require('unique-names-generator');
const res = require('express/lib/response');

module.exports = {
  getUsers: async function (req, res) {
    try {
      let users = await models.Users.findAll({ raw: true });
      if (users) {
        res.status(200).json({
          message: 'success',
          users: users,
        });
      } else {
        res.status(404).json({
          message: 'No users found',
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.errors[0].message,
      });
    }
  },
  Register: async function (req, res) {
    let body = req.body;
    const { username, password, user_fullname, user_email } = body;
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    let user_id = crypto.randomUUID();

    try {
      await models.Users.create({
        user_id: user_id,
        username: username,
        user_fullname: user_fullname,
        password: passwordHashed,
        user_email: user_email,
        user_stream_key:
          `rtmp://${process.env.STREAM_DOMAIN}:1935/live/` + user_id,
        user_role: 1,
        user_wallet_address: '0xFAD8e802b189d935A0C0F5fE18c2Ec22DA9B8587',
      });

      res.status(201).json({ message: 'user created' });
    } catch (err) {
      res.status(500).json({
        message: err.errors[0].message,
      });
    }
  },
  Login: async function (req, res) {
    let { username, password } = req.body;
    let user = await models.Users.findOne({ where: { username: username } });
    if (user) {
      let passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        let {
          user_id,
          username,
          user_fullname,
          user_email,
          user_stream_key,
          user_role,
          user_avatar,
        } = user;
        let access_token = jwt.sign(
          {
            privilege: user_role === '2' ? 'admin' : 'user',
            user_id: user_id,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '10d',
          }
        );
        res.cookie('bsc_at', access_token, {
          httpOnly: true,
          secure: true,
          path: '/',
          sameSite: 'none',
          maxAge: new Date(Date.now() + 900000),
        });
        res.status(200).json({
          user: {
            user_id: user_id,
            username: username,
            user_fullname: user_fullname,
            user_email: user_email,
            user_stream_key: user_stream_key,
            user_role: user_role,
            user_avatar: user_avatar,
          },
        });
      } else {
        res.status(403).json({
          message: 'wrong password',
        });
      }
    } else {
      res.status(404).json({
        message: 'no user found',
      });
    }
  },
  UpdateUser: async function (req, res) {
    let id = req.params.id;
    if (ValidatePriviledge(req, id)) {
      try {
        const updatedRows = await models.Users.update(req.body, {
          where: { user_id: id },
        });

        let user = await models.Users.findOne({
          where: {
            user_id: id,
          },
          attributes: {
            exclude: ['password', 'user_id', 'user_stream_key', 'user_role'],
          },
        });

        res.status(200).json({
          user: user,
        });
      } catch (err) {
        res.status(500).json({
          message: err,
        });
      }
    } else {
      res.status(401).json({
        message: 'unauthorized',
      });
    }
  },
  GetUser: async function (req, res) {
    let id = req.params.id;
    try {
      const user = await models.Users.findOne({
        where: { user_id: id },
        attributes: { exclude: ['password'] },
      });
      res.status(200).json({
        message: 'success',
        user: user,
      });
    } catch (err) {
      res.status(500).json({
        message: err.errors[0].message,
      });
    }
  },
  DeleteUser: async function (req, res) {
    let id = req.params.id;

    try {
      await models.Users.destroy({
        where: {
          user_id: id,
        },
      });

      res.status(200).json({
        message: 'user deleted',
      });
    } catch (err) {
      res.status(500).json({
        message: err.errors[0].message,
      });
    }
  },
  GetIDFromUsername: async (req, res) => {
    let username = req.params.username;

    try {
      let user = await models.Users.findOne({
        where: {
          username: username,
        },
        attributes: ['user_id'],
      });

      res.status(200).json({
        message: 'success',
        user_id: user.user_id,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  },
  GetUsernames: async (req, res) => {
    let usernames = await models.Users.findAll({
      attributes: ['username'],
    });

    res.status(200).json({
      users: usernames.map((username) => username.username),
    });
  },
  Logout: async (req, res) => {
    res.clearCookie('bsc_at');
  },
  BulkCreateUser: async (req, res) => {
    for (let i = 0; i < 200; i++) {
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash('12345678', salt);

      let user_id = crypto.randomUUID();

      await models.Users.create({
        user_id: user_id,
        username: `pk20${i}`,
        user_fullname:
          uniqueNamesGenerator.uniqueNamesGenerator({
            dictionaries: [uniqueNamesGenerator.names],
          }) +
          ' ' +
          uniqueNamesGenerator.uniqueNamesGenerator({
            dictionaries: [uniqueNamesGenerator.names],
          }),
        password: passwordHashed,
        user_email: `pk20${i}@gmail.com`,
        user_stream_key:
          `rtmp://${process.env.STREAM_DOMAIN}:1935/live/` + user_id,
        user_role: 1,
        user_avatar:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      });
    }
    res.status(201).json({ message: 'users created' });
  },
};
