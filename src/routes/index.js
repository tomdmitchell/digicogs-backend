import express from 'express';
import { getDataRoutes } from './data';

const getRoutes = () => {
  const router = express.Router();
  router.use('/data', getDataRoutes());
  return router;
}

export { getRoutes };
