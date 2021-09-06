import express from 'express';
import { nanoid } from 'nanoid';

//data
import masterData from '../data/master_data_reformat';

//functions
import { getDiscogsApiData } from '../functions/getDiscogsApiData';
import { handleResWarnings } from '../functions/handleResWarnings';
import { formClientResponse } from '../functions/formClientResponse';
import { shuffleArray } from '../functions/shuffleArray';
import { createGenreDataArray } from '../functions/createGenreDataArray';
import { filterDataIntoBatch } from '../functions/filterDataIntoBatch';
import { getUsedIds } from '../functions/getUsedIds';
import { handleUser } from '../functions/handleUser';
import { getImages } from '../functions/getImages';
import { handleBatchNumber } from '../functions/handleBatchNumber';
import { createSpecDataArray } from '../functions/createSpecDataArray';

const privateRoute = () => {
  const router = express.Router();
  router.get('/data', handlePrivateRoute);
  return router;
};

const handlePrivateRoute = async (req, res) => {
  const isNewUser = !req.cookies.userId ? true : false;
  const usedIds = isNewUser ? null : await getUsedIds(req.cookies.userId);
  console.log('used IDs: ', usedIds);
  const userId = isNewUser ? nanoid() : req.cookies.userId;
  const batchNumber = handleBatchNumber(req.query.batch);
  //
  console.time('createSpecDataArray');
  const specData = createSpecDataArray(
    req.query.genre,
    req.query.style,
    req.query.year,
    batchNumber,
    masterData,
    usedIds
  );
  console.timeEnd('createSpecDataArray');

  // const genreData = createGenreDataArray(req.query.genre, masterData);
  // const shuffledData = shuffleArray(genreData);
  //
  // const batchData = filterDataIntoBatch(
  //   req.query.year,
  //   req.query.style,
  //   // shuffledData,
  //   batchNumber,
  //   usedIds
  // );

  const releaseIdsForBatch = specData.map((data) => data.releaseId);
  // //
  await handleUser(isNewUser, userId, releaseIdsForBatch);
  isNewUser
    ? res.cookie('userId', userId, { maxAge: 7200000, sameSite: 'none', secure: true })
    : null;
  // //
  const discogsApiData = await getDiscogsApiData(specData);
  handleResWarnings(discogsApiData);
  const imageDataArr = await getImages(discogsApiData, req.query.images);
  const clientResponse = formClientResponse(discogsApiData, specData, imageDataArr);
  res.send(clientResponse);
};

export { privateRoute };
