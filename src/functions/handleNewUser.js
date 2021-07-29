import fsPromises from 'fs/promises';

const handleNewUser = async (newUserId, releaseIds) => {
    const jsonData = JSON.stringify({usedIds: releaseIds}, null, 2);
    try {
      await fsPromises.writeFile(`src/temp_user_data/${newUserId}.json`, jsonData);
    } catch (err) {
      console.log(`ERROR writing JSON in handleNewUser: `, err);
    }


};

module.exports = { handleNewUser };