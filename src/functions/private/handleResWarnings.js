const handleResWarnings = (apiResponse) => {
  //NO RESULTS
  // if (apiResponse.length === 0) {
  //   console.log('NO MORE RESULTS REMAINING');
  //   return
  // }
  //TOO MANY REQUESTS  
  const rateLimitRemaining = apiResponse[apiResponse.length -1].headers['x-discogs-ratelimit-remaining'];
  if (rateLimitRemaining <= 10) {
    console.log('HANDLE RATE LIMITING WARNING TO CLIENT HERE');
  }
};

module.exports = { handleResWarnings };
