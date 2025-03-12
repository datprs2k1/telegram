require('dotenv').config();

const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const { NewMessage } = require('telegram/events');
const { Client, GatewayIntentBits } = require('discord.js');
const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;
const discordToken = process.env.DISCORD_TOKEN;

const client = new TelegramClient(
  new StringSession(
    '1BQANOTEuMTA4LjU2LjE5MwG7tlgXlwev4JcJ5mDFjjitXZDK5xWNDZf7xjFUfzkRoIuRpLOOfETwRunQVh3X77Ej03v7fxU7Hm1abniZ5JDmGgRC6dmU14iaKWuv2LRohnGXcbSHDIX5v1u1L4NIidqv5ku/gvYv57nkqHpXFHjTSIVf7YOu2L0r9IAAaoeey6Hje7js5cRIkeH3yosnklZOO9O+WKzGWZtKhAJyuaTnVnXl1eekFa/Zv0LDn/x4U8M0urm1F75EINuppIGFQmI824Ajf25a3v/5sveUT7VDVrxR25C64nuOONRT2uzMl/CiQzp6om+/5Psm3S7B1jcDglzke1GzpxCyDnHMmEJVzw=='
  ),
  parseInt(apiId),
  apiHash
);

const discord = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

let discordChannel;

discord.on('ready', async () => {
  console.log(`> Bot is on ready`);
  const channel = await discord.channels.fetch('1349310183502905428');
  discordChannel = channel;
});

discord.login(discordToken);

(async () => {
  await client.connect();
  client.addEventHandler(
    eventPrint,
    new NewMessage({
      chats: ['-1002493740338'],
    })
  );
})();

async function eventPrint(event) {
  const message = event.message;
  discordChannel.send(message.text);
}
