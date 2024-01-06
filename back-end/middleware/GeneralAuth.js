const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  VerifyJWT: (req, res, next) => {
    const token = req.cookies.bsc_at;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) {
          res.status(403).json({
            message: 'Token invalid',
          });
        } else {
          req.caller = data.user_id;
          req.privilege = data.privilege;
          next();
        }
      });
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  },
};
