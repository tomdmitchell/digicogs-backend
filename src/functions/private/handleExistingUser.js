import fsPromises from 'fs/promises';

const handleExistingUser = async (existingUserId, newUniqueIds) => {
  try {
    const existingFile = await fsPromises.readFile(`src/temp_user_data/${existingUserId}.json`);
    const existingFileParsed = JSON.parse(existingFile);
    console.log('existing file parsed: ', existingFileParsed);
    const updatedIdArr = existingFileParsed.usedIds.concat(newUniqueIds);
    console.log('updated id arr: ', updatedIdArr);
    const updatedJsonData = JSON.stringify(
      { expiry: existingFileParsed.expiry, usedIds: updatedIdArr },
      null,
      2
    );
    console.log('updated json data: ', updatedJsonData);
    await fsPromises.writeFile(`src/temp_user_data/${existingUserId}.json`, updatedJsonData);
  } catch (err) {
    console.log(`ERROR writing JSON in handleExistingUser: ${err}`);
  }
};

module.exports = { handleExistingUser };
