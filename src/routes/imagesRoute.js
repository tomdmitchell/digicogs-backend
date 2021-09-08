import express from 'express';

const imagesRoute = () => {
  const router = express.Router();
  router.get('/data', handleImageRoute);
  return router;
}

const handleImageRoute = async (req, res) => {
  console.log('hitting handleImageRoute route')
  res.send({myImage: 'testing image route', myData: 98765});
}

export { imagesRoute };
