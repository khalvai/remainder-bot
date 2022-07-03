"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, "../.env") });
const grammy_1 = require("grammy");
const text_formater_1 = require("./text.formater");
const connect_1 = __importDefault(require("./db/connect"));
const model_controller_1 = __importStar(require("./controller/model.controller"));
(0, connect_1.default)().then(() => {
    console.log('connected to database successfuly');
    const bot = new grammy_1.Bot('5414767064:AAHvYhrMuoix35yKExYkLpugnUvpOFWo19k');
    bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        ctx.reply('welcome to you first bot');
        const message = yield bot.api.getUpdates();
        console.log(message);
    }));
    bot.command('test', (ctx) => {
        const fromSender = ctx.from;
        ctx.reply(fromSender);
    });
    bot.command('new', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const item = ctx.match;
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        const inputs = (0, text_formater_1.format)(item);
        const chatId = ctx.msg.message_id;
        let userDate = inputs[0];
        if (!(0, text_formater_1.isValidDate)(userDate)) {
            return ctx.reply(".تاریخ وارد شده معتبر نمیباسد", { reply_to_message_id: chatId });
        }
        const userformatedDate = new Date((0, text_formater_1.converDateToMildai)(userDate + ""));
        const meeting = new model_controller_1.default();
        const dateObject = {
            userId: userId,
            time: userformatedDate,
            message: inputs[1],
        };
        const meet = yield meeting.createDate(dateObject);
        return ctx.reply(meet, { reply_to_message_id: chatId });
    }));
    bot.command('getAllDates', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const chatId = ctx.msg.message_id;
        const userId = (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id;
        const allDates = yield model_controller_1.default.getAllUserDate(userId);
        ctx.reply(allDates, { reply_to_message_id: chatId });
    }));
    bot.hears('salam', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = ctx.msg.message_id;
        yield ctx.reply('salam khalvai', { reply_to_message_id: chatId });
    }));
    function remmberDate() {
        return __awaiter(this, void 0, void 0, function* () {
            const meetings = yield (0, model_controller_1.getAllDates)();
            meetings.map((m) => {
                if (checkDate(m)) {
                    bot.api.sendMessage(m.userId, m.message);
                }
            });
        });
    }
    function checkDate(meet) {
        if (monthEquals(meet) && dayEquals(meet) && yearEquals(meet)) {
            return true;
        }
        return false;
    }
    function monthEquals(meet) {
        const currentMonth = new Date().getMonth();
        const dateMonth = meet.time.getMonth();
        return currentMonth === dateMonth ? true : false;
    }
    function dayEquals(meet) {
        const currentDay = new Date().getDate();
        const dateDay = meet.time.getDate();
        return currentDay === dateDay ? true : false;
    }
    function yearEquals(meet) {
        const currentYear = new Date().getFullYear();
        const yearDate = meet.time.getFullYear();
        return currentYear === yearDate ? true : false;
    }
    setInterval(remmberDate, 10 * 60 * 60 * 1000);
    bot.on('message', (ctx) => ctx.reply('Got aonther message'));
    bot.catch((error) => {
        const ctx = error.ctx;
        if (error instanceof grammy_1.GrammyError) {
            console.log(`Erorr is in request : ${error.description}`);
        }
        if (error instanceof grammy_1.HttpError) {
            console.log(`coulden't contact to telegra ${error}`);
        }
        else {
            console.log(`unkonwen error ${error}`);
        }
    });
    bot.start().then(() => console.log("the khalvai bot is running baby")).catch(console.error);
})
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
