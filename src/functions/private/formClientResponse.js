// const formClientResponse = (apiResponse, dataBatch, imageDataArr) => {
const formClientResponse = (apiResponse, dataBatch, limitWarning) => {
  // const requiresImages = !imageDataArr ? false : true;
  const apiFilteredRes = apiResponse.map((apiResObj, index) => {
    return {
      id: handleGenericInfo(apiResObj.data.id),
      year: handleGenericInfo(apiResObj.data.year),
      url: handleGenericInfo(apiResObj.data.uri),
      artist: handleGenericInfo(apiResObj.data.artists_sort),
      title: handleGenericInfo(apiResObj.data.title),
      labelInfo: handleLabelInfo(apiResObj.data),
      country: handleGenericInfo(apiResObj.data.country),
      videos: handleVideoInfo(apiResObj.data),
      styles: handleGenericInfo(dataBatch[index].styles),
      genre: handleGenericInfo(dataBatch[index].genre),
      images: handleImagesInfo(apiResObj.data),
      // image: requiresImages ? handleImageInfo(imageDataArr[index]) : handleImageInfo(null),
      numberOfReviews: handleGenericInfo(dataBatch[index].numberOfReviews),
      limitWarning: limitWarning
    };
  });
  return apiFilteredRes;
};

const handleGenericInfo = (data) => {
  return !data ? null : data;
};

const handleLabelInfo = (apiDataObj) => {
  if (!apiDataObj.labels) return null;
  const labelInfo = apiDataObj.labels.map((labelObj) => {
    return {
      labelName: labelObj.name,
      catNo: labelObj.catno,
    };
  });
  return labelInfo[0]
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

const handleImagesInfo = (apiDataObj) => {
  if (!apiDataObj.images) return null;
  const imagesInfo = apiDataObj.images
    .filter((imageObj) => imageObj.type === 'primary')
    .map((imageObj) => {
      return {
        urls: {
          uri: imageObj.uri,
          uri150: imageObj.uri150,
        },
        dimensions: { width: imageObj.width, height: imageObj.height },
      };
    });
    return imagesInfo[0]
};

// const handleImageInfo = (imageData) => {
//   return { data: imageData };
// };

module.exports = { formClientResponse };
