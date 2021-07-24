const createGenreDataArray = (genreParam, allData) => {
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

module.exports = { createGenreDataArray };
