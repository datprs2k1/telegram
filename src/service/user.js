const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;

const getCode = async (string_session) => {
  try {
    const client = new TelegramClient(new StringSession(string_session), parseInt(apiId), apiHash);

    await client.connect();

    let dialogs = await client.getDialogs();

    await client.destroy();

    let chat = dialogs.filter((x) => x.name == 'Telegram')[0];

    let message = chat.message.message;

    let code = message.match(/Login code: (.*?). Do not give/);

    if (!code) {
      throw new Error('Không lấy được mã code');
    }

    return code[1];
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getCode,
};
