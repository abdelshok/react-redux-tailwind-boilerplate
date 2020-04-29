// App.js
// Root of the application

// External Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Internal Modules and files
import './App.css';
import Routes from './routing/Routes';
// Containers
import LoginContainer from './containers/LoginContainer';
// Styled Components
import MainAppWrapper from './styledComponents/MainAppWrapper';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: ''
    }
  }

  render() {

    const childProps = {
      isAuthenticated: this.props.isAuthenticated,
    }

    console.log('Is user authenticated ', childProps);

    return (
      <MainAppWrapper>
          <Routes childProps={childProps} />
      </MainAppWrapper>
    );
  }

}

// Typechecking for the App's passed in props 
App.propTypes = {
	isAuthenticated: PropTypes.bool,
};

// Sets the default props of the app container
App.defaultProps = {
	isAuthenticated: false
};

// Maps the store's properties to the App container's props in order to render the
// correct application UI when user authenticates
function mapStateToProps(state) {
	return {
			isAuthenticated: state.authentication.isAuthenticated
	};
}

export default connect(
  mapStateToProps,
)(App);
