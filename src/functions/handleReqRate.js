const handleReqRate = (apiResponse) => {
  // console.log(`RATE LIMIT USED: ${apiResponse.headers['x-discogs-ratelimit-used']}`);
  const rateLimitRemaining = apiResponse.headers['x-discogs-ratelimit-remaining'];
  if (rateLimitRemaining <= 10) {
    console.log('HANDLE RATE LIMITING WARNING TO CLIENT HERE');
  }
};

module.exports = { handleReqRate };
