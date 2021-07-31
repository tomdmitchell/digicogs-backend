import fsPromises from 'fs/promises';

const handleNewUser = async (newUserId, releaseIds) => {
  const fileExpiry = new Date().getTime() + 3600000;
  const jsonData = JSON.stringify({ expiry: fileExpiry, usedIds: releaseIds }, null, 2);
  try {
    await fsPromises.writeFile(`src/temp_user_data/${newUserId}.json`, jsonData);
  } catch (err) {
    console.log(`ERROR writing JSON in handleNewUser: `, err);
  }
};

module.exports = { handleNewUser };
