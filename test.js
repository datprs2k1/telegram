require('dotenv').config();

const { Api, TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;

(async () => {
  const client = new TelegramClient(
    new StringSession(
      '1BQANOTEuMTA4LjU2LjE5MwG7Z2GdLkGx7bzH6XdUJJdl2F3IjXtZDJODNMt1UG8QVR4Hl8BrZX5jwlmElMYOjxuIBGHkTV7JAzhyLhIFvoybAVL7PDYPPzkPfaFrJC2herpaxcgVAS4IJ9VAndQnRCcMPFIgcsLndT/1+2khWPqn8coGI738x+42y20bCxy2sM56oB5G5I24ehoZUbUq3tqtFLpv9I08ZvurW4tNjJeYZd+99xM2p/nbCFAHVhm+m2wkZ06Ob3wKZdkP+nvElrMhaotrny06cDnHA6UpdASf7/of7UMOJp5qXOgKqRA+5SFPI0hvfYIHkHZiNpwjZuVoZAkyAMsDp6/FE4xA4b70vw=='
    ),
    parseInt(apiId),
    apiHash
  );

  await client.connect();

  let dialogs = await client.getDialogs();

  console.log(dialogs);
})();
