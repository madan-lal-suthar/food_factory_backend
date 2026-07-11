"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var logger = winston_1.default.createLogger({
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: './log/%DATE%_info.log',
            datePattern: 'DD-MM-YYYY',
            level: 'info'
        }),
        new winston_daily_rotate_file_1.default({
            filename: './log/%DATE%_error.log',
            datePattern: 'DD-MM-YYYY',
            level: 'error'
        })
    ]
});
exports.default = logger;
