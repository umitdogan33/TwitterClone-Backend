const winston = require("winston");
const date = new Date();
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { date: date.getDate() },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'v1/src/logs/server/info.log', level: 'info' })
    ],
});

module.exports=logger;