const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  var repos = [];

  // This route should take the github username provided
  var username = req.body.username;

  var cb = (err, res, body) => {
    if (!err && res.statusCode === 200) {
      var resRepos = JSON.parse(res.body);
      for (var i = 0; i < resRepos.length; i++) {
        var repoObj = {
          id: resRepos[i].id,
          name: resRepos[i].name,
          url: resRepos[i].url,
          stargazers_count: resRepos[i].stargazers_count,
          watchers_count: resRepos[i].watchers_count,
          forks_count: resRepos[i].forks_count
        }
        repos.push(repoObj);
      }
    }
  }

  // and get the repo information from the github API, then
  github.getReposByUsername(username, cb);
  // save the repo information in the database
  setTimeout(() => {db.save(repos)}, 1000);
  res.status(200).send('OK');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

