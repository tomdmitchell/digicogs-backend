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
  try {
    const apiResponse = await Promise.all(promiseArr);
    return apiResponse
  } catch (err) {
    console.log(`ERROR getting Discogs Api Response: ${err}`)
  }

};


module.exports = { getDiscogsApiData };
