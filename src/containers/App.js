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

  render() {
    return (
      <MainAppWrapper>
        <LoginContainer />
      </MainAppWrapper>
    );
  }

}

export default App;
