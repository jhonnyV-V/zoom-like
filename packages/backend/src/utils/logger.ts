import winston from 'winston';

const { createLogger, transports, format } = winston;

const { combine, timestamp, json } = format;

const logger = createLogger({
  format: format.combine(format.splat(), format.simple()),
  transports: new transports.File({
    filename: 'logs/api.log',
    format: combine(timestamp(), json()),
    handleExceptions: true,
    handleRejections: true,
  }),
});

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;