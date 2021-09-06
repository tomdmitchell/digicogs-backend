import { shuffleArray } from './shuffleArray';

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
  let resultsArr = [];
  for (let i = 0; i < batchSize; i++) {
    const randomEntry = generateNewRandomEntry(
      stylesRequired,
      allData,
      yearsParam,
      resultsArr,
      usedIds
    );
    resultsArr.push(randomEntry);
  }
  console.log(resultsArr);
  return resultsArr;
};

const generateNewRandomEntry = (stylesRequired, allData, yearsParam, resultsArr, usedIds) => {
  const resultsArrIds = resultsArr.map((result) => result.releaseId);
  const stylesShuffled = shuffleArray([...stylesRequired]);
  //
  for (let i = 0; i < stylesShuffled.length; i++) {
    const styleForIteration = stylesShuffled[i];
    const yearsForStyleShuffled = shuffleArray(Object.keys(allData[styleForIteration].data));
    //
    let yearsRequired;
    if (yearsParam !== 'all') {
      let reqYearsArr = Array.isArray(yearsParam) ? yearsParam : [yearsParam];
      yearsRequired = yearsForStyleShuffled.filter((yearForStyle) =>
        reqYearsArr.includes(yearForStyle)
      );
    } else {
      yearsRequired = yearsForStyleShuffled;
    }
    //
    for (let j = 0; j < yearsRequired.length; j++) {
      const yearForStyle = yearsRequired[j];
      const resultsShuffled = shuffleArray(allData[styleForIteration].data[yearForStyle]); //arr
      for (let k = 0; k < resultsShuffled.length; k++) {
        if (
          resultsArrIds.includes(resultsShuffled[k].releaseId) ||
          usedIds.includes(resultsShuffled[k].releaseId)
        ) {
          console.log('already used: ', resultsShuffled[k].releaseId);
          continue;
        } else {
          return resultsShuffled[k];
        }
      }
    }
  }
  console.log('no more results');
  return null;
};

module.exports = { createBatchDataArr };
