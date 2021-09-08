import fsPromises from 'fs/promises';

const handleExistingUser = async (existingUserId, newUniqueIds) => {
  try {
    const existingFile = await fsPromises.readFile(`src/temp_user_data/${existingUserId}.json`);
    const existingFileParsed = JSON.parse(existingFile);
    const updatedIdArr = existingFileParsed.usedIds.concat(newUniqueIds);
    const updatedJsonData = JSON.stringify(
      { expiry: existingFileParsed.expiry, usedIds: updatedIdArr },
      null,
      2
    );
    await fsPromises.writeFile(`src/temp_user_data/${existingUserId}.json`, updatedJsonData);
  } catch (err) {
    console.log(`ERROR writing JSON in handleExistingUser: ${err}`);
  }
};

module.exports = { handleExistingUser };
