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
import { handleExistingUser } from '../functions/handleExistingUser';
import { handleNewUser } from '../functions/handleNewUser';
import {getUsedIds} from '../functions/getUsedIds';

const privateRoute = () => {
  const router = express.Router();
  router.get('/data', handlePrivateRoute);
  return router;
};

const handlePrivateRoute = async (req, res) => {
  const genreData = createGenreDataArray(req.query.genre, masterData);
  const shuffledData = shuffleArray(genreData);
  let batchData;
  //
  if (!req.cookies.userId) {
    //NEW USER
    batchData = filterDataIntoBatch(req.query.year, req.query.style, shuffledData, 10, null);
    let releaseIdsForBatch = batchData.map((data) => data.releaseId)
    const userId = nanoid();
    console.log(`no cookie set  - assign User ID: ${userId}`);
    await handleNewUser(userId, releaseIdsForBatch);
    res.cookie('userId', userId, { maxAge: 3600000 }); //1 hour in ms from Date.now()
  } else {
    //EXISTING USER
    const usedIds = await getUsedIds(req.cookies.userId);
    batchData = filterDataIntoBatch(req.query.year, req.query.style, shuffledData, 10, usedIds);
    let releaseIdsForBatch = batchData.map((data) => data.releaseId)
    await handleExistingUser(req.cookies.userId, releaseIdsForBatch);
    console.log(`cookie exists for User ID: ${req.cookies.userId}`);
  }
  //
  const discogsApiData = await getDiscogsApiData(batchData);
  handleResWarnings(discogsApiData);
  const clientResponse = formClientResponse(discogsApiData, batchData);
  res.send(clientResponse);
};

export { privateRoute };
