import TelegramBot from 'node-telegram-bot-api';

const TOKEN = process.env.TGM_TOKEN || '';

export const telegramBot = new TelegramBot(TOKEN, {polling: true});
