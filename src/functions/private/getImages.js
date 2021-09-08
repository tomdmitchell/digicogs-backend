import axios from 'axios';

const getImages = async (discogsData, imageType) => {
  if (imageType === 'none') return null;
  const apiImageKey = imageType === 'thumb' ? 'uri150' : imageType === 'full' ? 'uri' : null;
  if (apiImageKey === null) throw `ERROR IN IMAGE REQ QUERY PARAM`;
  //
  let promiseArr = [];
  const options = {
    responseType: 'arraybuffer',
  };
  for (let i = 0; i < discogsData.length; i++) {
    if (discogsData[i].data.images) {
      const reqPromise = axios.get(`${discogsData[i].data.images[0][apiImageKey]}`, options);
      promiseArr.push(reqPromise);
    } else {
      promiseArr.push(
        new Promise((resolve) => {
          resolve(null);
        })
      );
    }
  }
  try {
    const imageResArr = await Promise.all(promiseArr);
    const imageDataArr = imageResArr.map((imageRes) => {
      return imageRes ? Buffer.from(imageRes.data, 'binary').toString('base64') : null;
    });
    return imageDataArr;
  } catch (err) {
    console.log(`ERROR getting image data response: ${err}`);
    return null;
  }
};

module.exports = { getImages };
