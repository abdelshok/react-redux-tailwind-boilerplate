// Login Container
// Contains all smart and dumb components necessary for login into the application

// External Packages
import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
// Internal Modules
import { authenticateUser, storeUserData } from '../actionCreators/actions';
import store from '../store/store';

// Styled Components
import LoginWrapper from '../styledComponents/LoginWrapper';
import AnimatedText from '../styledComponents/AnimatedText';
import SmallHeaderText from '../styledComponents/SmallHeaderText';
import SpotifyButton from '../styledComponents/SpotifyButton';
import TextVideoComponent from '../components/TextVideoComponent';

// Utility Functions
import SpotifyAPI from '../utilityLibrary/spotify';

let spotify;

// Change the Login URI so that the domain is chosen depending on the
// environment that we're in, production and development

class LoginContainer extends Component {

    constructor(props){ 
        super(props);
        this.state = {}
    }

    // After the function connectToSpotify below is called because of a user click, the componentDidMount function is
    // called again and sets in the hashParams variable to be equal to an object containing the access_token attribute
    // which we need to use in future API calls to retrieve the data  we want
    componentDidMount = () => {
        let hashParams = {}
        let e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        // Change authentication state to true and retrieve user spotify information in order to display main page 
        if (hashParams.access_token) {
            this.authenticateUser(true)
            this.getUserSpotifyInfo(hashParams.access_token)
            spotify = new SpotifyAPI(hashParams.access_token)
            spotify.getNewReleases(2, undefined, undefined)
        }
    }

    // Call made in order to retrieve the user's spotify information, using the access token that we retrieved from 
    // the call by the connectToSpotify function
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

        // Store data in redux store to make sure it's accessible by future components
        store.dispatch(storeUserData(user.data))
    }

    // Function called when SpotifyButton is clicked on Login page, triggers redirect to Spotify login in order to retrieve
    // the access token necessary to make API calls
    connectToSpotify = () => {
        // Redirects us to spotify page
        window.location.href =
        "https://accounts.spotify.com/authorize?client_id=df148a09256046c68a0c535f9da43238&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000";
    }
    
    // Ensures that the isAuthenticated state in the redux store is set to true
    // Called after we successfully received the access token, which allows us to retrieve the remaining
    // of the user's information
    authenticateUser = () => {
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
