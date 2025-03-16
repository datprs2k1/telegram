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
const discordToken = process.env.DISCORD_TOKEN;

let data = [
  {
    id: '1350020887646306304',
    name: 'btc-price',
    groups: [-1001313788595],
  },
  {
    id: '1350021705770209280',
    name: 'eth-price',
    groups: [-1001387716380],
  },
  {
    id: '1350021787722846229',
    name: 'sol-price',
    groups: [-1002054516195],
  },
  {
    id: '1350021919797284874',
    name: 'box-liquid',
    groups: [-1001407057468],
  },
  {
    id: '1341117151347474566',
    name: 'box-dump-pumps',
    groups: [-1001245027408],
  },
];

let chats = data.map((item) => item.groups).flat();

let discordServers = data.map((item) => item.id);

const client = new TelegramClient(new StringSession(telegramToken), parseInt(apiId), apiHash);

const discord = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

let discordChannels;

discord.on('ready', async () => {
  console.log(`> Bot is on ready`);
  discordChannels = await Promise.all(
    discordServers.map(async (server) => {
      const channel = await discord.channels.fetch(server);
      return channel;
    })
  );
});

discord.login(discordToken);

(async () => {
  await client.connect();
  client.addEventHandler(
    eventPrint,
    new NewMessage({
      chats,
    })
  );
})();

async function eventPrint(event) {
  const message = event.message;
  const media = message.media;

  let group = chats.find((item) => item.toString().includes(Number(message.chat.id)));

  let discordChannelId = data.find((item) => item.groups.includes(group)).id;

  const discordChannel = discordChannels.find((channel) => channel.id === discordChannelId);

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
