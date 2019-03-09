const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useMongoClient: true });

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  name: String,
  username: String,
  url: String,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoList) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

    for (var repo = 0; repo < repoList.length; repo++) {
      var record = new Repo(repoList[repo]);
      record.save()
        .then(repo => {
          console.log(repo)
        })
        .catch(err => {
          console.error(err)
        })
    }
}

let read = () => {
  return Repo.find().sort({stargazers_count: 'descending'});
}

module.exports.save = save;
module.exports.read = read;