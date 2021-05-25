import {telegramBot} from './telegramBot';

export const notifyAllMembers = (SUBSRIBED_CHAT_IDS: string[], message: string) => {
  SUBSRIBED_CHAT_IDS.forEach((chatId) => {
    telegramBot.sendMessage(chatId, message);
  });
};
