import {handleNewUser} from '../functions/handleNewUser';
import {handleExistingUser} from '../functions/handleExistingUser';

const handleUser = async (isNewUser, userId, releaseIds) => {
  if (isNewUser) {
    console.log('NEW USER');
    await handleNewUser(userId, releaseIds)
  } else {
    console.log('EXISTING USER');
    await handleExistingUser(userId, releaseIds)
  }
};

module.exports = { handleUser };
