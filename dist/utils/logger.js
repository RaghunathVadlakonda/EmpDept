"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const defaultLevel = 'info';
const options = {
    exitOnError: false,
    level: defaultLevel,
    transports: [
        new DailyRotateFile({
            filename: "./%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "2d",
            dirname: "logs",
            level: "info",
            format: winston_1.format.combine(winston_1.format.label({ label: 'SecurityModule' }), winston_1.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }), winston_1.format.simple()),
        }),
        new winston_1.transports.Console(),
    ]
};
exports.logger = winston_1.createLogger(options);
//# sourceMappingURL=logger.js.map