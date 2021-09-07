import { getNewRandomData } from './getNewRandomData';

const createBatchDataArr = (genreParam, stylesParam, yearsParam, batchSize, allData, usedIds) => {
  //GENRE
  const genreStyleKeys =
    genreParam !== 'all'
      ? Object.keys(allData).filter((styleKey) => allData[styleKey].genre === genreParam)
      : Object.keys(allData);
  //STYLE
  let reqStylesArr = Array.isArray(stylesParam) ? stylesParam : [stylesParam];
  let stylesRequired =
    stylesParam !== 'all'
      ? genreStyleKeys.filter((specGenreStyleKey) => reqStylesArr.includes(specGenreStyleKey))
      : genreStyleKeys;
  //YEARS & PRODUCE ARRAY
  let dataResult = [];
  for (let i = 0; i < batchSize; i++) {
    const randomData = getNewRandomData(stylesRequired, allData, yearsParam, dataResult, usedIds);
    if (!randomData && i !== 0) {
      break;
    } else if (!randomData && i === 0) {
      dataResult = null;
      break;
    } else {
      dataResult.push(randomData);
    }
  }
  console.log(dataResult)
  return dataResult;
};

module.exports = { createBatchDataArr };
