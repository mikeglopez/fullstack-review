import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      toggleChange: false
    }
    this.search = this.search.bind(this);
    this.display = this.display.bind(this);
  }

  componentDidMount () {
    this.display();
  }

  display () {
    $.ajax({
      method: 'GET',
      url: '/repos',
      dataType: 'json',
      success: (data) => {
        this.setState({
          repos: data,
          toggleChange: !this.state.toggleChange
        });
      },
      error: (err) => {
        console.log('error:', err);
      }
    });
  };

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: { username: term },
      success: (data) => {
        console.log(data);
        this.display()
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));