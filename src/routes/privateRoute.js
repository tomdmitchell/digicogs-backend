import express from 'express';
import { nanoid } from 'nanoid';

//data
import masterData from '../data/master_data_reformat';

//functions
import { getDiscogsApiData } from '../functions/getDiscogsApiData';
import { handleResWarnings } from '../functions/handleResWarnings';
import { formClientResponse } from '../functions/formClientResponse';
import { getUsedIds } from '../functions/getUsedIds';
import { handleUser } from '../functions/handleUser';
import { getImages } from '../functions/getImages';
import { handleBatchNumber } from '../functions/handleBatchNumber';
import { createBatchDataArr } from '../functions/createBatchDataArr';

const privateRoute = () => {
  const router = express.Router();
  router.get('/data', handlePrivateRoute);
  return router;
};

const handlePrivateRoute = async (req, res) => {
  const isNewUser = !req.cookies.userId ? true : false;
  const usedIds = isNewUser ? [] : await getUsedIds(req.cookies.userId);
  const userId = isNewUser ? nanoid() : req.cookies.userId;
  const batchNumber = handleBatchNumber(req.query.batch);
  //
  console.time('createBatchDataArr');
  const batchData = createBatchDataArr(
    req.query.genre,
    req.query.style,
    req.query.year,
    batchNumber,
    masterData,
    usedIds
  );
  console.timeEnd('createBatchDataArr');
  //
  const releaseIdsForBatch = batchData.map((data) => data.releaseId);
  await handleUser(isNewUser, userId, releaseIdsForBatch);
  isNewUser
    ? res.cookie('userId', userId, { maxAge: 7200000, sameSite: 'none', secure: true })
    : null;
  //
  const discogsApiData = await getDiscogsApiData(batchData);
  handleResWarnings(discogsApiData);
  const imageDataArr = await getImages(discogsApiData, req.query.images);
  const clientResponse = formClientResponse(discogsApiData, batchData, imageDataArr);
  res.send(clientResponse);
};

export { privateRoute };

//remove year and genre from individual objects in masterData
