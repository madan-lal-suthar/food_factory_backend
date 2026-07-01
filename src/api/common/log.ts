import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

var logger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      filename: './log/%DATE%_info.log',
      datePattern: 'DD-MM-YYYY',
      level: 'info'
    }),
    new DailyRotateFile({
      filename: './log/%DATE%_error.log',
      datePattern: 'DD-MM-YYYY',
      level: 'error'
    })
  ]
});

export default logger;