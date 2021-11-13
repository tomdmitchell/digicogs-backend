import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import logger from 'loglevel';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { getRoutes } from './routes';

const startServer = ({ port = process.env.PORT } = {}) => {
  const app = express();
  app.use(helmet());
  app.use(
    cors({
      origin: `${
        process.env.NODE_ENV !== 'dev' ? process.env.CORS_ORIGIN : process.env.CORS_ORIGIN_DEV
      }`,
      methods: ['GET'],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use('/', getRoutes());
  app.use(errorMiddleware);

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${server.address().port}`);
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };
      setupCloseOnExit(server);
      resolve(server);
    });
  });
};

const errorMiddleware = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
  } else {
    logger.error(error);
    res.status(500);
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production' ? null : { stack: error.stack }),
    });
  }
};

const setupCloseOnExit = (server) => {
  async function exitHandler(options = {}) {
    await server
      .close()
      .then(() => {
        logger.info('Server successfully closed');
      })
      .catch((e) => {
        logger.warn('Something went wrong closing the server', e.stack);
      });
    // eslint-disable-next-line no-process-exit
    if (options.exit) process.exit();
  }

  process.on('exit', exitHandler);
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));
  process.once('SIGHUP', exitHandler.bind(null, { exit: true }));
  process.once('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.once('SIGUSR2', exitHandler.bind(null, { exit: true }));
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
};

export { startServer };
