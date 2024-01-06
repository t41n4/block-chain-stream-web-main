const { body, validationResult } = require('express-validator');

module.exports = {
  LoginValidation: () => {
    return [
      body('username', 'Invalid username')
        .notEmpty()
        .matches(/^[A-Za-z0-9]+$/),
      body('password', 'password more than 8 degits').isLength({ min: 8 }),
    ];
  },
  RegisterValidation: () => {
    return [
      body('username', 'Invalid username')
        .notEmpty()
        .matches(/[A-Za-z0-9\s]+$/)
        .withMessage('Must not contain special characters'),
      body('password', 'password more than 8 degits')
        .notEmpty()
        .withMessage('Must not empty')
        .isLength({ min: 8 }),
      body('confirmed_password', 'Password does not match').custom(
        (value, { req }) => value === req.body.password
      ),
      body('user_email', 'Must be a correct email format')
        .notEmpty()
        .withMessage('Must not empty')
        .isEmail(),
      body('user_fullname', 'Must not contain special characters')
        .notEmpty()
        .withMessage('Must not empty')
        .matches(/[A-Za-z0-9\s]+$/),
    ];
  },
  UpdateValidation: () => {
    return [
      body('username', 'Invalid username')
        .optional()
        .matches(/[A-Za-z0-9\s]+$/)
        .withMessage('Must not contain special characters'),
      body('user_email', 'Must be a correct email format').optional().isEmail(),
      body('user_fullname', 'Must not contain special characters')
        .optional()
        .matches(/[A-Za-z0-9\s]+$/),
      body('user_avatar', 'Invalid username')
        .optional()
        .isURL()
        .withMessage('Must be an URL'),
    ];
  },
  // CreateVideoValidation: () => {
  //   return [
  //     body('video_urls', 'Invalid username')
  //       .matches(/[A-Za-z0-9\s]+$/)
  //       .withMessage('Must not contain special characters'),
  //     body('user_email', 'Must be a correct email format').isEmail(),
  //     body('user_fullname', 'Must not contain special characters').matches(
  //       /[A-Za-z0-9\s]+$/
  //     ),
  //   ]
  // },
  // ! DO NOT MODIFY THIS FUNCTION
  Validation: (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(422).json({ errors: error.array() });
      return;
    }

    next();
  },
};
