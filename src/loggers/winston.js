import * as winston from 'winston'

const loggerDev = winston.createLogger({
    transports: [
        new winston.transports.Console({level: "silly"}),
        new winston.transports.File({filename:"info.log", level: "info"})
    ]
})

const loggerProd = winston.createLogger({
    transports: [
        new winston.transports.Console({level: "info"}),
    ]
})

let logger;

if (process.argv[3] === "PROD") {
    logger = loggerProd 
    logger.log("info", "MODO => PRODUCCION")
} else {
    logger = loggerDev
    logger.log("info", "MODO => DEV")
}

// logger.log("silly","Mensaje silly")
// logger.log("debug","Mensaje debug")
// logger.log("verbose","Mensaje verbose")
// logger.log("info","Mensaje info")
// logger.log("warn","Mensaje warn")
// logger.log("error","Mensaje error")

export default logger
