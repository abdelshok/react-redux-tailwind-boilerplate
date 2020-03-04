// App.js
// Root of the application

// External Packages
import React, { Component } from 'react';
// Internal Modules and files
import '../App.css';
// Containers
import LoginContainer from './LoginContainer';
// Styled Components
import MainAppWrapper from '../styledComponents/MainAppWrapper';


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
      <MainAppWrapper>
        <LoginContainer />
      </MainAppWrapper>
    );
  }

}

export default App;
