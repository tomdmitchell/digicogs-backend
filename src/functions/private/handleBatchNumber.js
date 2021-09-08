const handleBatchNumber = (batchParam) => {
  if (!batchParam) {
    throw 'ERROR: NO BATCH PARAM EXISTS';
  } else if (isNaN(batchParam)) {
    throw 'ERROR: BATCH PARAM NaN';
  } else if (Number(batchParam) < 1 || Number(batchParam) > 15) {
    throw 'ERROR: BATCH REQ EXCEEDS LIMIT';
  } else {
    return Number(batchParam);
  }
};

module.exports = { handleBatchNumber };
