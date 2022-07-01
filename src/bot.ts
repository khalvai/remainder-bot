import { Bot, GrammyError, HttpError, Api } from 'grammy';
import { format } from './text.formater';
import { connect,} from './db/connect';
import Meeting ,{getAllDates}from './controller/model.controller';
import { meetingDocument } from './model/date.model';

connect();

const bot = new Bot('5414767064:AAHvYhrMuoix35yKExYkLpugnUvpOFWo19k');

bot.command('start', async (ctx) => {
  ctx.reply('welcome to you first bot');
  const message = await bot.api.getUpdates();
  console.log(message);
});

bot.command('test', (ctx) => {
  const fromSender = ctx.from as string;
  ctx.reply(fromSender);
});

bot.command('new', async (ctx) => {
  const item = ctx.match;
  const userId = ctx.from?.id as number;
  const inputs = format(item);
  const chatId = ctx.msg.message_id as number;
  const userDate = new Date(inputs[0]);
  

  const meeting = new Meeting();
  const dateObject: meetingDocument = {
    userId: userId,
    time: userDate,
    message: inputs[1],
  };

  const meet = await meeting.createDate(dateObject);

  ctx.reply(meet, { reply_to_message_id: chatId });
});

bot.command('getAllDates', async (ctx) => {
  const chatId = ctx.msg.message_id as number;
  const userId = ctx.from?.id as number;

  const allDates = await Meeting.getAllUserDate(userId);

  ctx.reply(allDates, { reply_to_message_id: chatId });
});

bot.hears('salam', async (ctx) => {
  const chatId = ctx.msg.message_id as number;

  await ctx.reply('salam khalvai', { reply_to_message_id: chatId });
});

async function remmberDate() {
  const meetings = await getAllDates();

  meetings.map((m) => {
    if (checkDate(m)) {
      bot.api.sendMessage(m.userId, m.message);
    }
  });
}

function checkDate(meet: meetingDocument) {
  if (monthEquals(meet) && dayEquals(meet) && yearEquals(meet)) {
    return true;
  }

  return false;
}

function monthEquals(meet: meetingDocument) {
  const currentMonth = new Date().getMonth();
  const dateMonth = meet.time.getMonth();

  return currentMonth === dateMonth ? true : false;
}

function dayEquals(meet: meetingDocument) {
  const currentDay = new Date().getDate();
  const dateDay = meet.time.getDate();

  return currentDay === dateDay ? true : false;
}

function yearEquals(meet: meetingDocument) {
  const currentYear = new Date().getFullYear();
  const yearDate = meet.time.getFullYear();

  return currentYear === yearDate ? true : false;
}

setInterval(remmberDate, 1 * 60 * 1000);

bot.on('message', (ctx) => ctx.reply('Got aonther message'));

bot.catch((error) => {
  const ctx = error.ctx;

  if (error instanceof GrammyError) {
    console.log(`Erorr is in request : ${error.description}`);
  }
  if (error instanceof HttpError) {
    console.log(`coulden't contact to telegra ${error}`);
  } else {
    console.log(`unkonwen error ${error}`);
  }
});

bot.start();
