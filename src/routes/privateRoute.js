import express from 'express';

//data
import masterData from '../data/master_data';

//functions
import { getDiscogsApiData } from '../functions/getDiscogsApiData';
import { handleReqRate } from '../functions/handleReqrate';
import { formClientResponse } from '../functions/formClientResponse';
import { shuffleArray } from '../functions/shuffleArray';
import { createGenreDataArray } from '../functions/createGenreDataArray';
import { filterDataIntoBatch } from '../functions/filterDataIntoBatch';

const privateRoute = () => {
  const router = express.Router();
  router.get('/data', handlePrivateRoute);
  return router;
};

const handlePrivateRoute = async (req, res) => {
  const genreData = createGenreDataArray(req.query.genre, masterData);
  const shuffledData = shuffleArray(genreData);
  const batchData = filterDataIntoBatch(req.query.year, req.query.style, shuffledData, 10);
  console.log(`Batch data length: ${batchData.length}`);
  const discogsApiData = await getDiscogsApiData(batchData);
  handleReqRate(discogsApiData[discogsApiData.length - 1]);
  const clientResponse = formClientResponse(discogsApiData, batchData);
  res.send(clientResponse);
};

export { privateRoute };
