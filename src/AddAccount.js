const { Telegram } = require('./database/models');

const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const apiId = 19841096;
const apiHash = 'a4590000442ad97d52d1b924458e0ca3';
const stringSession = new StringSession(); // fill this later with the value from session.save()

(async () => {
  try {
    console.log('Loading interactive example...');
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.start({
      phoneNumber: async () => await input.text('Please enter your number: '),
      password: async () => await input.text('Please enter your password: '),
      phoneCode: async () => await input.text('Please enter the code you received: '),
      onError: (err) => console.log(err),
    });
    console.log('You should now be connected.');

    let account = await client.getMe();

    let entry = await Telegram.findOrCreate({
      where: {
        uid: account.id,
      },
      defaults: {
        username: account.username,
        firstName: account.firstName,
        lastName: account.lastName,
        phone: account.phone,
        string_session: client.session.save(),
      },
    });

    console.log('Connected as', entry);
  } catch (err) {
    console.log(err);
  }
})();
