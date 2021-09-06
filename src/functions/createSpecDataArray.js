import { shuffleArray } from './shuffleArray';

const createSpecDataArray = (genreParam, stylesParam, yearsParam, batchSize, allData) => {
  // let resultsArr = [];
  // //GENRE
  // let specGenreStyleKeys;
  // if (genreParam !== 'all') {
  //   specGenreStyleKeys = Object.keys(allData).filter(
  //     (styleKey) => allData[styleKey].genre === genreParam
  //   );
  // } else {
  //   specGenreStyleKeys = Object.keys(allData);
  // }
  // //STYLE
  // if (stylesParam === 'all') {
  //   console.log('do nothing');
  // } else {
  //   let reqStylesArr = Array.isArray(stylesParam) ? stylesParam : [stylesParam];
  //   specGenreStyleKeys = specGenreStyleKeys.filter((specGenreStyleKey) =>
  //     reqStylesArr.includes(specGenreStyleKey)
  //   );
  // }
  // //YEARS
  // if (yearsParam === 'all') {
  //   specGenreStyleKeys.forEach((specGenreStyleKey) => {
  //     const yearsForStyle = Object.keys(allData[specGenreStyleKey].data);
  //     const results = yearsForStyle.map((yearForStyle) => {
  //       return allData[specGenreStyleKey].data[yearForStyle];
  //     });
  //     resultsArr.push(results.flat());
  //   });
  // } else {
  //   let reqYearsArr = Array.isArray(yearsParam) ? yearsParam : [yearsParam];
  //   specGenreStyleKeys.forEach((specGenreStyleKey) => {
  //     const yearsForStyle = Object.keys(allData[specGenreStyleKey].data);
  //     const yearsRequired = yearsForStyle.filter((yearForStyle) => {
  //       return reqYearsArr.includes(yearForStyle);
  //     });
  //     const results = yearsRequired.map((yearForStyle) => {
  //       return allData[specGenreStyleKey].data[yearForStyle];
  //     });
  //     resultsArr.push(results.flat());
  //   });
  // }
  // const flatResults = resultsArr.flat();
  // console.log(flatResults.length);
  // return flatResults;
  //
  //
  //
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
    const randomEntry = generateNewRandomEntry(specGenreStyleKeys, allData, yearsParam, resultsArr);
    console.log(randomEntry.releaseId)
    // const resultsArrIds = resultsArr.map(result => result.releaseId);
    //check that id not already in results arr
    //check that id not in usedIds list
    //if there are no results left, handle that - though this will need to have some sort of memory of all the id's already randomly generated, and find out when the end point is (all ID's have been used in some way and no more results remain).
    resultsArr.push(randomEntry)
  }
  console.log(resultsArr);
  return resultsArr;
};

const generateNewRandomEntry = (specGenreStyleKeys, allData, yearsParam, resultsArr) => {
  const shuffledGenreStyleKeysCopy = shuffleArray([...specGenreStyleKeys]);
  const styleForIteration = shuffledGenreStyleKeysCopy[0];
  const shuffledYearsForStyle = shuffleArray(Object.keys(allData[styleForIteration].data));
  let yearForStyle;
  if (yearsParam !== 'all') {
    let reqYearsArr = Array.isArray(yearsParam) ? yearsParam : [yearsParam];
    const yearsRequired = shuffledYearsForStyle.filter((yearForStyle) =>
      reqYearsArr.includes(yearForStyle)
    );
    yearForStyle = yearsRequired[0]
  } else {
    yearForStyle = shuffledYearsForStyle[0]
  }
  return shuffleArray(allData[styleForIteration].data[yearForStyle])[0];
}

module.exports = { createSpecDataArray };
