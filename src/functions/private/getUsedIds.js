import fsPromises from 'fs/promises';

const getUsedIds = async (existingUserId) => {
  try {
    const existingFile = await fsPromises.readFile(`src/temp_user_data/${existingUserId}.json`);
    return JSON.parse(existingFile).usedIds;
  } catch (err) {
    console.log(`ERROR getting UsedIds: ${err}`)
    return [];
  }
};

module.exports = { getUsedIds };
