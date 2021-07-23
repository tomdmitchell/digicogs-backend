import express from 'express';
import { privateRoute } from './privateRoute';
import { publicRoute } from './publicRoute';

const getRoutes = () => {
  const router = express.Router();
  router.use('/private', privateRoute());
  router.use('/public', publicRoute());
  return router;
}

export { getRoutes };
