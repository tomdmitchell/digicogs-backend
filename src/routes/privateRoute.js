import express from 'express';
import masterData from '../data/master_data';

//functions
import { getDiscogsApiData } from '../functions/getDiscogsApiData';

const privateRoute = () => {
  const router = express.Router();
  router.get('/data', handlePrivateRoute);
  return router;
};

const handlePrivateRoute = async (req, res) => {
  //GET INITIAL ARR OF DATA
  const genreData = createGenreDataArr(req.query.genre, masterData);
  const shuffledData = shuffleArr(genreData);
  const returnedData = filterDataIntoBatch(req.query.year, req.query.style, shuffledData, 10);
  console.log(`Returned data length: ${returnedData.length}`);
  const clientResponse = await getDiscogsApiData(returnedData);
  res.send(clientResponse);
};

const filterDataIntoBatch = (yearsParam, stylesParam, allData, batchSize) => {
  let reqStylesArr = Array.isArray(stylesParam) ? stylesParam : [stylesParam];
  let reqYearsArr = Array.isArray(yearsParam) ? yearsParam : [yearsParam];
  let resultsArr = [];
  let count = 0;
  for (let i = 0; i < allData.length; i++) {
    if (count === batchSize) break;
    for (let j = 0; j < reqYearsArr.length; j++) {
      if (allData[i].year === Number(reqYearsArr[j]) || reqYearsArr[j] === 'all') {
        for (let k = 0; k < reqStylesArr.length; k++) {
          if (allData[i].style.includes(reqStylesArr[k]) || reqStylesArr[k] === 'all') {
            count++;
            resultsArr.push(allData[i]);
          }
        }
      }
    }
  }
  return resultsArr;
};

const createGenreDataArr = (genreParam, allData) => {
  if (genreParam === 'all') {
    return Object.keys(allData)
      .map((objKey) => {
        return allData[objKey];
      })
      .flat();
  } else {
    const genreArr = Array.isArray(genreParam) ? genreParam : [genreParam];
    return genreArr
      .map((genre) => {
        return allData[genre];
      })
      .flat();
  }
};

const shuffleArr = (array) => {
  //Fisher–Yates shuffle
  let m = array.length;
  let t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element...
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

export { privateRoute };
