import express from 'express';
import { getImageData } from '../functions/images/getImageData';

const imagesRoute = () => {
  const router = express.Router();
  router.get('/data', handleImageRoute);
  return router;
};

const handleImageRoute = async (req, res) => {
  const imageData = await getImageData(req.query.imageUrl);
  res.send(imageData);
};

export { imagesRoute };
