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
  handleReqRate(apiResponse[apiResponse.length - 1]);
  const clientResponse = formClientResponse(apiResponse, dataBatch);
  return clientResponse;
};

const handleReqRate = (apiResponse) => {
  // console.log(`RATE LIMIT USED: ${apiResponse.headers['x-discogs-ratelimit-used']}`);
  const rateLimitRemaining = apiResponse.headers['x-discogs-ratelimit-remaining'];
  if (rateLimitRemaining <= 10) {
    console.log('HANDLE RATE LIMITING WARNING TO CLIENT HERE');
  }
};

const formClientResponse = (apiResponse, dataBatch) => {
  const apiFilteredRes = apiResponse.map((apiResObj, index) => {
    return {
      year: apiResObj.data.year,
      url: apiResObj.data.uri,
      artist: apiResObj.data.artists_sort,
      title: apiResObj.data.title,
      labelInfo: handleLabelInfo(apiResObj.data),
      country: apiResObj.data.country,
      videos: handleVideoInfo(apiResObj.data),
      styles: apiResObj.data.styles,
      thumbnail: apiResObj.data.thumb,
      images: handleImageInfo(apiResObj.data),
      numberOfReviews: dataBatch[index].numberOfReviews,
    };
  });
  return apiFilteredRes;
};

const handleLabelInfo = (apiDataObj) => {
  return apiDataObj.labels.map((labelObj) => {
    return {
      labelName: labelObj.name,
      catNo: labelObj.catno,
    };
  });
};

const handleVideoInfo = (apiDataObj) => {
  return apiDataObj.videos
    .filter((videoObj) => {
      return videoObj.embed;
    })
    .map((videoObj) => {
      return {
        videoUrl: videoObj.uri,
        title: videoObj.title,
      };
    });
};

const handleImageInfo = (apiDataObj) => {
  return apiDataObj.images.map((imagesObj) => {
    return {
      type: imagesObj.type,
      url: imagesObj.uri,
      width: imagesObj.width,
      height: imagesObj.height,
    };
  });
};

module.exports = { getDiscogsApiData };
