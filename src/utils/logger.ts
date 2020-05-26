import { createLogger, format, transports, LoggerOptions } from 'winston';
import DailyRotateFile = require("winston-daily-rotate-file");

const defaultLevel = 'info';
const options: LoggerOptions = {
    exitOnError: false,
    level: defaultLevel,
    transports:[
        new DailyRotateFile({
            filename: "./%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "2d",
            dirname: "logs",
            level: "info",
            format: format.combine(
                format.label({ label: 'SecurityModule' }),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                  }),
                format.simple(),
            ),
        }),
       new transports.Console(),

    ]
};

export let logger = createLogger(options);
