const bot = require('./tgmBot');

const SUBSRIBED_CHAT_IDS = (process.env.SUBSRIBED_CHAT_IDS || '').split(';');

const notifyAllMembers = (message) => {
  SUBSRIBED_CHAT_IDS.forEach((chatId) => {
    bot.sendMessage(chatId, message);
  });
};

module.exports = notifyAllMembers;
