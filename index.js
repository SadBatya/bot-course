const {gameOption, againOption} = require('./options.js')


const TelegramApi = require('node-telegram-bot-api');
const token = '6806692837:AAHFYSsYP3q12hVzU9ivgFLSf1W3TCtKLc8';

const bot = new TelegramApi(token, { polling: true });

const chats = {};


const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 1 до 10');
  const randomNumber = Math.floor(Math.random() * 10);
  chatId[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывай', gameOption);
};

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Информация о пользователе' },
    { command: '/game', description: 'Сыграть в игру отгадай число' },
  ]);

  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/info') {
      await bot.sendSticker(
        chatId,
        `https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp`
      );
      await bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
      );
    }

    if (text === '/game') {
      return startGame(chatId)
    }

    await bot.sendMessage(chatId, `Ты написал мне ${text}`);
  });

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again') {
      return startGame(chatId)
    }
    if (data === chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `Поздравляю, ты отгадал цифру ${chats[chatId]}`,
        againOption
      );
    } else {
      return bot.sendMessage(
        chatId,
        `К сожалению ты не угадал цифру`,
        againOption
      );
    }
  });
};

start();
