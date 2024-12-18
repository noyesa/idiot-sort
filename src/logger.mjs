import winston from 'winston';

/**
 * Winston console logger.
 */
const logger = winston.createLogger({
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

/**
 * Logs an error to the console.
 * @param {string} message - The message to log as error.
 */
export function error(message) {
  logger.error(message);
}

/**
 * Logs info to the console.
 * @param {string} message - The message to log as info.
 */
export function info(message) {
  return logger.info(message);
}
