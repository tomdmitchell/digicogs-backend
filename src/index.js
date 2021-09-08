import 'dotenv/config';
import logger from 'loglevel';
import { startServer } from './start';
import {handleExpiredFiles} from './functions/private/handleExpiredFiles';
logger.setLevel('info');
startServer();
handleExpiredFiles();