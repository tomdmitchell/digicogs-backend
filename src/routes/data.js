import express from 'express';

const getDataRoutes = () => {
  const router = express.Router();
  router.get('/styles', styles);
  return router;
}

const styles = async (req, res) => {
  res.send({myStyle: 'testing', myData: 12345});
}

// const subtract = async (req, res) => {
//   const difference = Number(req.query.a) - Number(req.query.b);
//   res.send(difference.toString());
// }

export { getDataRoutes };
