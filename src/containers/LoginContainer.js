// Login Container
// Contains all smart and dumb components necessary for login into the application

// External Packages
import React, { Component } from 'react';
// Internal Modules
// Styled Components
import LoginWrapper from '../styledComponents/LoginWrapper';
import AnimatedText from '../styledComponents/AnimatedText';
import SmallHeaderText from '../styledComponents/SmallHeaderText';
import SpotifyButton from '../styledComponents/SpotifyButton';
import TextVideoComponent from '../components/TextVideoComponent';

class LoginContainer extends Component {

    constructor(props){ 
        super(props);
        this.state = {}
    }

    render() {
        return (
            <LoginWrapper>
            <AnimatedText> Spotify API </AnimatedText>
            <SmallHeaderText> Fullstack skeleton for your Spotify-API-based applications </SmallHeaderText>
            <SpotifyButton> Login </SpotifyButton>
            </LoginWrapper>    
        )
    }
}

export default LoginContainer
