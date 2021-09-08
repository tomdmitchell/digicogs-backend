import express from 'express';
import { privateRoute } from './privateRoute';
import { publicRoute } from './publicRoute';
import { imagesRoute } from './imagesRoute';

const getRoutes = () => {
  const router = express.Router();
  router.use('/private', privateRoute());
  router.use('/public', publicRoute());
  router.use('/images', imagesRoute());
  return router;
}

export { getRoutes };
