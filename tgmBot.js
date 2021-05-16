const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TGM_TOKEN;

const bot = new TelegramBot(TOKEN, {polling: true});

module.exports = bot;
