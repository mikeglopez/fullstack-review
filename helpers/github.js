require('dotenv').config();
const request = require('request-promise-native');
var token = process.env.API_TOKEN;

let getReposByUsername = (user) => {
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };

  return request(options);
}

module.exports.getReposByUsername = getReposByUsername;