import express from 'express';
import { nanoid } from 'nanoid';

//data
import masterData from '../data/master_data';

//functions
import { getDiscogsApiData } from '../functions/getDiscogsApiData';
import { handleResWarnings } from '../functions/handleResWarnings';
import { formClientResponse } from '../functions/formClientResponse';
import { shuffleArray } from '../functions/shuffleArray';
import { createGenreDataArray } from '../functions/createGenreDataArray';
import { filterDataIntoBatch } from '../functions/filterDataIntoBatch';
import { getUsedIds } from '../functions/getUsedIds';
import { handleUser } from '../functions/handleUser';

const privateRoute = () => {
  const router = express.Router();
  router.get('/data', handlePrivateRoute);
  return router;
};

const handlePrivateRoute = async (req, res) => {
  const isNewUser = !req.cookies.userId ? true : false;
  const genreData = createGenreDataArray(req.query.genre, masterData);
  const shuffledData = shuffleArray(genreData);
  //
  let usedIds = isNewUser ? null : await getUsedIds(req.cookies.userId);
  let userId = isNewUser ? nanoid() : req.cookies.userId;
  const batchData = filterDataIntoBatch(req.query.year, req.query.style, shuffledData, 10, usedIds);
  let releaseIdsForBatch = batchData.map((data) => data.releaseId);
  //
  await handleUser(isNewUser, userId, releaseIdsForBatch);
  isNewUser ? res.cookie('userId', userId, { maxAge: 7200000 }, sameSite="None") : null;
  //
  const discogsApiData = await getDiscogsApiData(batchData);
  handleResWarnings(discogsApiData);
  const clientResponse = formClientResponse(discogsApiData, batchData);
  res.send(clientResponse);
};

export { privateRoute };
