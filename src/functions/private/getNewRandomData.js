import { shuffleArray } from './shuffleArray';

const getNewRandomData = (stylesRequired, allData, yearsParam, resultsArr, usedIds) => {
  const resultsArrIds = resultsArr.map((result) => result.releaseId);
  const stylesShuffled = shuffleArray([...stylesRequired]);
  //
  for (let i = 0; i < stylesShuffled.length; i++) {
    const styleForIteration = stylesShuffled[i];
    const yearsForStyleShuffled = shuffleArray(Object.keys(allData[styleForIteration].data));
    //
    const reqYearsArr = Array.isArray(yearsParam) ? yearsParam : [yearsParam];
    const yearsRequired =
      yearsParam !== 'all'
        ? yearsForStyleShuffled.filter((yearForStyle) => reqYearsArr.includes(yearForStyle))
        : yearsForStyleShuffled;
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
          const resultCopy = Object.assign({}, resultsShuffled[k]);
          resultCopy.genre = allData[styleForIteration].genre;
          return resultCopy;
        }
      }
    }
  }
  console.log('no more results');
  return null;
};

module.exports = { getNewRandomData };
