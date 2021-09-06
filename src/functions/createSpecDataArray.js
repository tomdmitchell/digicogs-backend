import { shuffleArray } from './shuffleArray';

const createSpecDataArray = (genreParam, stylesParam, yearsParam, batchSize, allData, usedIds) => {
  //GENRE
  let specGenreStyleKeys;
  if (genreParam !== 'all') {
    specGenreStyleKeys = Object.keys(allData).filter(
      (styleKey) => allData[styleKey].genre === genreParam
    );
  } else {
    specGenreStyleKeys = Object.keys(allData);
  }
  //STYLE
  if (stylesParam === 'all') {
    console.log('do nothing');
  } else {
    let reqStylesArr = Array.isArray(stylesParam) ? stylesParam : [stylesParam];
    specGenreStyleKeys = specGenreStyleKeys.filter((specGenreStyleKey) =>
      reqStylesArr.includes(specGenreStyleKey)
    );
  }
  //YEARS & PRODUCE ARRAY
  let resultsArr = [];
  for (let i = 0; i < batchSize; i++) {
    const randomEntry = generateNewRandomEntry(
      specGenreStyleKeys,
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

const generateNewRandomEntry = (specGenreStyleKeys, allData, yearsParam, resultsArr, usedIds) => {
  //
  const resultsArrIds = resultsArr.map((result) => result.releaseId);
  //
  const genreStyleKeys = shuffleArray([...specGenreStyleKeys]);

  for (let i = 0; i < genreStyleKeys.length; i++) {
    const styleForIteration = genreStyleKeys[i];
    const yearsForStyle = shuffleArray(Object.keys(allData[styleForIteration].data));
    //
    let yearsRequired;
    if (yearsParam !== 'all') {
      let reqYearsArr = Array.isArray(yearsParam) ? yearsParam : [yearsParam];
      yearsRequired = yearsForStyle.filter((yearForStyle) => reqYearsArr.includes(yearForStyle));
    } else {
      yearsRequired = yearsForStyle;
    }
    //
    for (let j = 0; j < yearsRequired.length; j++) {
      const yearForStyle = yearsRequired[j];
      const results = shuffleArray(allData[styleForIteration].data[yearForStyle]); //arr
      for (let k = 0; k < results.length; k++) {
        if (
          resultsArrIds.includes(results[k].releaseId) ||
          usedIds.includes(results[k].releaseId)
        ) {
          console.log('already used: ', results[k].releaseId);
          continue;
        } else {
          return results[k];
        }
      }
    }
  }
  console.log('no more results');
  return null;
};

module.exports = { createSpecDataArray };
