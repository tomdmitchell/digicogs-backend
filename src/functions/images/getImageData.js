import axios from 'axios';

const getImageData = async (imageUrl) => {
  const options = {
    responseType: 'arraybuffer',
  };

  try {
    const imageRes = await axios.get(imageUrl, options);
    const imageData = imageRes ? Buffer.from(imageRes.data, 'binary').toString('base64') : null;
    return imageData;
  } catch (err) {
    console.log(`ERROR getting image data response: ${err}`);
    return null;
  }
};

module.exports = { getImageData };
