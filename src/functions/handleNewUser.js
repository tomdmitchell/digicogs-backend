import fsPromises from 'fs/promises';

const handleNewUser = async (newUserId, releaseIdArr) => {
    const jsonData = JSON.stringify({usedIds: releaseIdArr}, null, 2);
    try {
      await fsPromises.writeFile(`src/temp_user_data/${newUserId}.json`, jsonData);
      console.log('JSON written successfully...');
    } catch (err) {
      console.log(`ERROR writing JSON: `, err);
    }


};

module.exports = { handleNewUser };