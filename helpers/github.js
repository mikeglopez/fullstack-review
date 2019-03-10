const request = require('request-promise-native');
const config = require('../config.js');

let getReposByUsername = (user) => {
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return request(options);
}

module.exports.getReposByUsername = getReposByUsername;