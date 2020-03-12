// Login Container
// Contains all smart and dumb components necessary for login into the application

// External Packages
import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import SpotifyWebApi from 'spotify-web-api-node';
// Internal Modules
import { authenticateUser, storeUserData } from '../actionCreators/actions';
import store from '../store/store';

// Styled Components
import LoginWrapper from '../styledComponents/LoginWrapper';
import AnimatedText from '../styledComponents/AnimatedText';
import SmallHeaderText from '../styledComponents/SmallHeaderText';
import SpotifyButton from '../styledComponents/SpotifyButton';
import TextVideoComponent from '../components/TextVideoComponent';

// Change the Login URI so that the domain is chosen depending on the
// environment that we're in, production and development


class LoginContainer extends Component {

    constructor(props){ 
        super(props);
        this.state = {}
    }

    componentDidMount = () => {
        let hashParams = {}
        let e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        if (hashParams.access_token) {
            this.authenticateUser(true)
            this.getUserSpotifyInfo(hashParams.access_token)
        }
    }

    getUserSpotifyInfo = async (accessToken) => {
        const user = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
              "Authorization": "Bearer " + accessToken
            }
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log('Error caught in axios call', err);
        })

        console.log('User', user)
        store.dispatch(storeUserData(user.data))
    }

    connectToSpotify = () => {
        // Redirects us to spotify page
        window.location.href =
        "https://accounts.spotify.com/authorize?client_id=df148a09256046c68a0c535f9da43238&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000";
    }
    
    authenticateUser = (hashParams) => {
        store.dispatch(authenticateUser(true));
        
    }
    render() {
        return (
            <LoginWrapper>
            <AnimatedText> Spotify API </AnimatedText>
            <SmallHeaderText> React-Redux boilerplate for your Spotify-API-based application </SmallHeaderText>
            <SpotifyButton onClick={this.connectToSpotify} > Login </SpotifyButton>
            </LoginWrapper>    
        )
    }
}

export default LoginContainer
