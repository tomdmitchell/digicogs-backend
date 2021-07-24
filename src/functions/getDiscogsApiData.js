import axios from 'axios';

const getDiscogsApiData = async (dataBatch) => {
  const options = {
    headers: {
      Authorization: `Discogs key=${process.env.Consumer_Key}, secret=${process.env.Consumer_Secret}`,
    },
  };
  let promiseArr = [];
  for (let i = 0; i < dataBatch.length; i++) {
    const reqPromise = axios.get(
      `https://api.discogs.com/releases/${dataBatch[i].releaseId}`,
      options
    );
    promiseArr.push(reqPromise);
  }
  const apiResponse = await Promise.all(promiseArr);
  return apiResponse

  // const clientResponse = formClientResponse(apiResponse, dataBatch);
  // return clientResponse;
};


module.exports = { getDiscogsApiData };
