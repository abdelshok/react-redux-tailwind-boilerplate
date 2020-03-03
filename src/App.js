import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: ''
    }
  }


  componentDidMount() {
    this.callBackend()
      .then(res => { 
        console.log('response from express', res);
      })
      .catch(err => console.log(err));
  }

  callBackend = async () => {
    const response = await fetch('/api/ping');
    console.log('response', response);
    // const body = await response.json();

    // if (response.status !== 200) throw Error(body.message);

    // return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

}

export default App;
