import React from 'react';



const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br></br>
    <br></br>
    <ul>
    {props.repos.map((repo, i) => {
      return (<li key={i}>⭐️: {repo.stargazers_count} {repo.name} by <a href={'https://github.com/' + repo.username}>{repo.username}</a></li>);
    })}
    </ul>
  </div>
)

export default RepoList;