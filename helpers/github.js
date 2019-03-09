const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, callback);
}

module.exports.getReposByUsername = getReposByUsername;