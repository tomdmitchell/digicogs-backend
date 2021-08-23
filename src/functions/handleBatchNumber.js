const handleBatchNumber = (batchParam) => {
  if (Number(batchParam) < 1 || Number(batchParam) > 15) {
    throw 'ERROR: BATCH REQ EXCEEDS LIMIT';
  } else {
    return Number(batchParam);
  }
};

module.exports = { handleBatchNumber };
