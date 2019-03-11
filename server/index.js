require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  var username = req.body.username;

  // and get the repo information from the github API, then
  github.getReposByUsername(username)
    .then((reposList) => {
      var repos = [];
      var resRepos = JSON.parse(reposList); // raw repos list

      for (var i = 0; i < resRepos.length; i++) {
        var repoObj = {
          id: resRepos[i].id,
          name: resRepos[i].name,
          username: resRepos[i].owner.login,
          url: resRepos[i].url,
          stargazers_count: resRepos[i].stargazers_count,
          watchers_count: resRepos[i].watchers_count,
          forks_count: resRepos[i].forks_count
        }
        repos.push(repoObj);
      }
      return repos;
    })
    // save the repo information in the database
    .then((reposArr) => {
      db.save(reposArr);
    })
    .then(() => {
      res.status(200).send('OK');
    });
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  var top25 = [];
  db.read().exec((err, repos) => {
    if (err) {
      console.log(err)
    } else {
      for (var repo = 0; (repo < repos.length) && (repo < 25); repo++) {
        top25.push(repos[repo]);
      }
      res.status(200).send(top25);
    }
  });
});

let port = process.env.PORT || 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

