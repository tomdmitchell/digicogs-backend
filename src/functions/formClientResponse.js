const formClientResponse = (apiResponse, dataBatch, imageBase64Arr) => {
  const apiFilteredRes = apiResponse.
  map((apiResObj, index) => {
    return {
      id: handleGenericInfo(apiResObj.data.id),
      year: handleGenericInfo(apiResObj.data.year),
      url: handleGenericInfo(apiResObj.data.uri),
      artist: handleGenericInfo(apiResObj.data.artists_sort),
      title: handleGenericInfo(apiResObj.data.title),
      labelInfo: handleLabelInfo(apiResObj.data),
      country: handleGenericInfo(apiResObj.data.country),
      videos: handleVideoInfo(apiResObj.data),
      styles: handleGenericInfo(apiResObj.data.styles),
      image: handleImageInfo(imageBase64Arr[index]),
      numberOfReviews: handleGenericInfo(dataBatch[index].numberOfReviews),
    };
  });
  return apiFilteredRes;
};

const handleGenericInfo = (data) => {
  return !data ? null : data;
};

const handleLabelInfo = (apiDataObj) => {
  if (!apiDataObj.labels) return null;
  return apiDataObj.labels.map((labelObj) => {
    return {
      labelName: labelObj.name,
      catNo: labelObj.catno,
    };
  });
};

const handleVideoInfo = (apiDataObj) => {
  if (!apiDataObj.videos) return null;
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

const handleImageInfo = (imageData) => {
  return {data: imageData}
};

module.exports = { formClientResponse };
