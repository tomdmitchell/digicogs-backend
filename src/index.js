import 'dotenv/config';
import logger from 'loglevel';
import { startServer } from './start';
import {handleExpiredFiles} from './functions/handleExpiredFiles';
logger.setLevel('info');
startServer();
handleExpiredFiles();