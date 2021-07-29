import fsPromises from 'fs/promises';

const handleExistingUser = async (existingUserId, newUniqueIds) => {
  try {
    const existingFile = await fsPromises.readFile(`src/temp_user_data/${existingUserId}.json`);
    const existingUsedIdsArr = JSON.parse(existingFile).usedIds;
    const updatedIdArr = existingUsedIdsArr.concat(newUniqueIds);
    const updatedJsonData = JSON.stringify({usedIds: updatedIdArr}, null, 2);
    await fsPromises.writeFile(`src/temp_user_data/${existingUserId}.json`, updatedJsonData);
    console.log('JSON written successfully...');
  } catch (err) {
    console.log(`ERROR writing JSON: `, err);
  }
};

module.exports = { handleExistingUser };
