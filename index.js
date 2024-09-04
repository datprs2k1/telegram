const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const apiId = 19841096;
const apiHash = 'a4590000442ad97d52d1b924458e0ca3';
const stringSession = new StringSession(
  '1BQANOTEuMTA4LjU2LjE5MwG7IYt1GowxHnr3rqy9uAdhNxvylYCRgFHhpKR56uBYi+cSlw4O3TjNBW5xOKy/dA1hbV4dcYYOT7gSSpzqARrt3etiHHJULS4snJSHEBouhXEVC+GsTlE41Ue0II21kNGgLqgBBlOB4ceg3MwhrdB+SVUjqScXbRvlMpSnpqRruDtjgJ/dYwEfUJV0XcjHeOId8BALvcROhFDqxq/rkwLINtpRlo6W00CJRTiL9njSBAdzsVaFEX1+Lzj32KJjOEyv/tvvKRnNS3Y6KPlDQNJokPZ56ZKnuMx6V7w+e8DyJP6KMEt5RpnNPv/YOmcSeBC7cqbfASQ/EhEt9ArpOjfzTg=='
); // fill this later with the value from session.save()

(async () => {
  console.log('Loading interactive example...');
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.connect();

  //Get
  // let chats = await client.getDialogs({});

  // chats = chats.filter((x) => x.name == 'Telegram')[0];

  // console.log(chats.message.message);

  //Hook
  // async function handler(event) {
  //   let message = event.message.message;

  //   let code = message.match(/Login code: (.*?). Do not give/);

  //   if (code) {
  //     console.log('Code:', code[1]);
  //   }
  // }

  // client.addEventHandler(handler, new NewMessage({}));
})();
