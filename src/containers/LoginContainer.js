// Login Container
// Contains all smart and dumb components necessary for login into the application

// External Packages
import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import styled, { keyframes } from 'styled-components';
// Internal Modules
import { authenticateUser, storeUserData, storeAccessToken } from '../actionCreators/actions';
import NeumorphicLoginWrapper from '../styledComponents/NeumorphicLoginWrapper';

import store from '../store/store';

// Styled Components
import LoginWrapper from '../styledComponents/LoginWrapper';
import AnimatedText from '../styledComponents/AnimatedText';
import SmallHeaderText from '../styledComponents/SmallHeaderText';
import SpotifyButton from '../styledComponents/SpotifyButton';
import TextVideoComponent from '../components/TextVideoComponent';

// Utility Functions
import SpotifyAPI from '../utilityLibrary/spotify';

const SpotifyLogo = require('../assets/logos/spotifyLogo.jpg');


const logoAnimation = keyframes`
    0%{background-position:0% 61%}
    50%{background-position:100% 40%}
    100%{background-position:0% 61%}
`;

const LogoWrapper = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    background: linear-gradient(180deg, #0ac14b, #d1f9d2);  
    background-size: 600% 600%;
    -webkit-animation: ${logoAnimation} 2s ease infinite;
    -moz-animation: ${logoAnimation} 2s ease infinite;
    animation: ${logoAnimation} 2s ease infinite;
    box-shadow: 0px 0px 2px #ECF0F3, 0px 0px 0px 5px #ECF0F3, 8px 8px 15px #A7AAAF, -8px -8px 15px #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
`;
// background-image: url(${SpotifyLogo});
// Alernate blue-lavender colored animated background:
// background: linear-gradient(270deg, #acc4ef, #b3abf0);



const TitleText = styled.div`
    text-align: center;
    font-size: 28px;
    padding-top: 24px;
    letter-spacing: 0.5px;
`;

const SubTitleText = styled.div`
    text-align: center;
    font-size: 15px;
    padding-top: 7px;
    letter-spacing: 3px;
`;

const SpotifyLogoLineWrapper = styled.div`
    width: 50%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SpotifyLogoLargeLine = styled.div`
    width: 100%;
    height: 8px;
    background-color: #ECF0F3;
    border-radius: 5px;
    margin-bottom: 2px;
    margin-top: 5px;
`

// border-top-left-radius: 20px;
// border-top-right-radius: 20px;

const SpotifyLogoMediumLine = styled(SpotifyLogoLargeLine)`
    width: 70%;
    height: 7px
    margin-top: 0px;

`

const SpotifyLogoSmallLine = styled(SpotifyLogoMediumLine)`
    width: 50%;
    height: 7px;
`

const NeumorphicLoginButton = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    width: 80%;
    height: 40px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 700;
    font-family: LatoRegular, sans-serif;
    color: #FFF;
    text-align: center;
    box-shadow: 3px 3px 8px #B1B1B1, -3px -3px 8px #FFFFFF;
    transition: 0.5s;
    margin: 0 auto;
    margin-top: 150px;
    background: #7CE199;

    &:hover {
        background: #96fab3;
    }
    &:active {
        background: #74c28b;
    };
`

// Alternate blue-purple color:

// background: #b3abf0;
// &:hover {
//     background: #beb5ff;
// }
// &:active {
//     background: #a29adb;
// }


// Alternate shadow color: #B1B1B1

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
    componentDidMount = async () => {
        let hashParams = {}
        let e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        // Change authentication state to true and retrieve user spotify information in order to display main page 
        if (hashParams.access_token) {
            let accessToken = hashParams.access_token;
            store.dispatch(storeAccessToken(accessToken));
            this.authenticateUser(true)
            let spotify = new SpotifyAPI(hashParams.access_token)
            let playlist = await spotify.getCurrentUserPlaylist()
            let userInformation = await spotify.getCurrentUserProfile();
            
            // Dispatch user data object to be stored in redux store (one-level of nesting)
            // Another way to do it wouldbe to extract the different data points (email, id, display_name) and store them
            // individually, to avoid nesting.
            const userData = userInformation.data;
            store.dispatch(storeUserData(userData));
            console.log('Current user information', userInformation);
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
            // <LoginWrapper>
            // <AnimatedText> Spotify API </AnimatedText>
            // <SmallHeaderText> React-Redux boilerplate for your Spotify-API-based application </SmallHeaderText>
            // <SpotifyButton onClick={this.connectToSpotify} > Login </SpotifyButton>
            // </LoginWrapper>    
            <NeumorphicLoginWrapper>
                <LogoWrapper>
                    <SpotifyLogoLineWrapper>
                        <SpotifyLogoLargeLine />
                        <SpotifyLogoMediumLine />
                        <SpotifyLogoSmallLine />
                    </SpotifyLogoLineWrapper>
                </LogoWrapper>
                <TitleText> Spotify </TitleText>
                <SubTitleText> Boilerplate </SubTitleText>
                <NeumorphicLoginButton onClick={this.connectToSpotify}>
                    Login
                </NeumorphicLoginButton>
            </NeumorphicLoginWrapper>
        )
    }
}

export default LoginContainer
