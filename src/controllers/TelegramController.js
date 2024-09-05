const { response } = require('../utils');
const { Telegram } = require('../database/models');
const { Op } = require('sequelize');
const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;

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

    new Promise(async (resolve, reject) => {
      try {
        const client = new TelegramClient(new StringSession(entry.string_session), parseInt(apiId), apiHash);

        await client.connect();

        let dialogs = await client.getDialogs();

        await client.destroy();

        let chat = dialogs.filter((x) => x.name == 'Telegram')[0];

        let message = chat.message.message;

        let code = message.match(/Login code: (.*?). Do not give/);

        if (!code) {
          reject('Không tìm thấy mã code');
        }

        resolve(code[1]);
      } catch (e) {
        reject(e);
      }
    }).then((code) => {
      return response(res, 200, null, 'Thành công', code);
    });
  } catch (e) {
    return response(res, 400, null, 'Có lỗi xảy ra', null);
  }
};

module.exports = {
  getCodeLogin,
};
