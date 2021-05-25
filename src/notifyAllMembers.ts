import {bot} from './tgmBot';

const SUBSRIBED_CHAT_IDS = (process.env.SUBSRIBED_CHAT_IDS || '').split(';');

export const notifyAllMembers = (message: string) => {
  SUBSRIBED_CHAT_IDS.forEach((chatId) => {
    bot.sendMessage(chatId, message);
  });
};
