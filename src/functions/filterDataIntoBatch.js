const filterDataIntoBatch = (yearsParam, stylesParam, allData, batchSize, usedIds) => {
  let reqStylesArr = Array.isArray(stylesParam) ? stylesParam : [stylesParam];
  let reqYearsArr = Array.isArray(yearsParam) ? yearsParam : [yearsParam];
  let resultsArr = [];
  let count = 0;
  for (let i = 0; i < allData.length; i++) {
    if (count === batchSize) break;
    if (usedIds && usedIds.includes(allData[i].releaseId)) {
      console.log('ID sent previously, not returned in batch: ', allData[i].releaseId);
      continue;
    }
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

module.exports = { filterDataIntoBatch };
