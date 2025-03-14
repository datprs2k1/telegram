require('dotenv').config();

const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const { NewMessage } = require('telegram/events');
const { Client, GatewayIntentBits } = require('discord.js');

// Creates a client
const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;
const telegramToken = process.env.TELEGRAM_TOKEN;
const telegramGroup = process.env.TELEGRAM_GROUP;
const discordToken = process.env.DISCORD_TOKEN;
const discordServer = process.env.DISCORD_CHANNEL;

const client = new TelegramClient(new StringSession(telegramToken), parseInt(apiId), apiHash);

const discord = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

let discordChannel;

discord.on('ready', async () => {
  console.log(`> Bot is on ready`);
  const channel = await discord.channels.fetch(discordServer);
  discordChannel = channel;
});

discord.login(discordToken);

(async () => {
  await client.connect();
  client.addEventHandler(
    eventPrint,
    new NewMessage({
      chats: [-1001245027408, -1001231213931, -1002201155722, -4601538298],
    })
  );
})();

async function eventPrint(event) {
  const message = event.message;
  const media = message.media;

  if (media) {
    const buffer = await client.downloadMedia(media);

    if (message.text) {
      await discordChannel.send({
        content: message.text,
        files: [buffer],
      });
    } else {
      await discordChannel.send({
        files: [buffer],
      });
    }
  } else if (message.text) {
    await discordChannel.send(message.text);
  }
}
