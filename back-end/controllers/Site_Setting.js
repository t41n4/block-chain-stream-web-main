const sequelize = require('../config/database');
const { ValidatePriviledge } = require('../helpers/validation');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

module.exports = {
  GetSiteTitle: async (req, res) => {
    let setting = await models.Site_Setting.findOne();
    console.log(setting);

    res.status(200).json({
      title: setting.site_title,
    });
  },
  UpdateTitle: async (req, res) => {
    if (ValidatePriviledge(req)) {
      let { title } = req.body;
      let setting = await models.Site_Setting.update({ title: title });

      res.status(204).json({
        title: setting.title,
      });
    } else {
      res.status(401).json({
        message: 'unauthorized',
      });
    }
  },
};
