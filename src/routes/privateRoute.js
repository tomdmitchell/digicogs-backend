import express from 'express';
import { nanoid } from 'nanoid';

//data
import masterData from '../data/master_data_reformat';

//functions
import { getDiscogsApiData } from '../functions/private/getDiscogsApiData';
import { handleResWarnings } from '../functions/private/handleResWarnings';
import { formClientResponse } from '../functions/private/formClientResponse';
import { getUsedIds } from '../functions/private/getUsedIds';
import { handleUser } from '../functions/private/handleUser';
// import { getImages } from '../functions/private/getImages';
import { handleBatchNumber } from '../functions/private/handleBatchNumber';
import { createBatchDataArr } from '../functions/private/createBatchDataArr';

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
  if (!batchData) {
    res.send('handle no more results');
    return;
  }
  const releaseIdsForBatch = batchData.map((data) => data.releaseId);
  await handleUser(isNewUser, userId, releaseIdsForBatch);
  isNewUser
    ? res.cookie('userId', userId, { maxAge: 7200000, sameSite: 'none', secure: true })
    : null;
  //
  const discogsApiData = await getDiscogsApiData(batchData);
  handleResWarnings(discogsApiData);
  // const imageDataArr = await getImages(discogsApiData, req.query.images);
  // const clientResponse = formClientResponse(discogsApiData, batchData, imageDataArr);
  const clientResponse = formClientResponse(discogsApiData, batchData);
  res.send(clientResponse);
};

export { privateRoute };

