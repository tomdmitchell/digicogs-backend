import express from 'express';

const publicRoute = () => {
  const router = express.Router();
  router.get('/data', handlePublicRoute);
  return router;
}

const handlePublicRoute = async (req, res) => {
  console.log('hitting handlePublicRoute route')
  res.send({myStyle: 'testing public route', myData: 12345});
}

export { publicRoute };
