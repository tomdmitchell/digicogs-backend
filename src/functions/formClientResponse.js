const formClientResponse = (apiResponse, dataBatch) => {
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
      thumbnail: handleGenericInfo(apiResObj.data.thumb),
      images: handleImageInfo(apiResObj.data),
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

const handleImageInfo = (apiDataObj) => {
  if (!apiDataObj.images) return null;
  return apiDataObj.images.map((imagesObj) => {
    return {
      type: imagesObj.type,
      url: imagesObj.uri,
      width: imagesObj.width,
      height: imagesObj.height,
    };
  });
};

module.exports = { formClientResponse };
