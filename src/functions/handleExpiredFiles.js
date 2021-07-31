import fsPromises from 'fs/promises';
import { CronJob } from 'cron';
const handleExpiredFiles = async () => {
  await deleteExpiredFiles();
  const checkForExpired = new CronJob('0 */60 * * * *', deleteExpiredFiles);
  checkForExpired.start();
};

const deleteExpiredFiles = async () => {
  const allFileNames = await fsPromises.readdir(`src/temp_user_data/`);
  for (let i = 0; i < allFileNames.length; i++) {
    const file = await fsPromises.readFile(`src/temp_user_data/${allFileNames[i]}`);
    const expiry = JSON.parse(file).expiry;
    if (new Date().getTime() > expiry) {
      await fsPromises.unlink(`src/temp_user_data/${allFileNames[i]}`);
    } else {
      console.log(`${allFileNames[i]} not expired`);
    }
  }
};

module.exports = { handleExpiredFiles };
