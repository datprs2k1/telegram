const { response } = require('../utils');
const { Telegram } = require('../database/models');
const { Op } = require('sequelize');
const { getCode } = require('../service/user');

const getCodeLogin = async (req, res) => {
  try {
    let { phone } = req.query;

    let entry = await Telegram.findOne({
      where: {
        phone: {
          [Op.like]: `%${phone}%`,
        },
      },
    });

    if (!entry) {
      return response(res, 404, null, 'Không tìm thấy dữ liệu', null);
    }

    let code = await new Promise(async (resolve, reject) => {
      try {
        let code = await getCode(entry.string_session);
        console.log(code);
        resolve(code);
      } catch (e) {
        reject(e);
      }
    });

    return response(res, 200, null, 'Thành công', code);
  } catch (e) {
    console.log(e);
    return response(res, 400, null, 'Có lỗi xảy ra', null);
  }
};

module.exports = {
  getCodeLogin,
};
