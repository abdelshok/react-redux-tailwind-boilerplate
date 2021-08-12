// Login Container
// Contains all smart and dumb components necessary for login into the application

// External Packages
import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import styled, { keyframes } from 'styled-components';
// Internal Modules
import { authenticateUser, storeAccessToken } from '../actionCreators/actions';
import store from '../store/store';

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

// Change the Login URI so that the domain is chosen depending on the
// environment that we're in, production and development

class LoginContainer extends Component {

    constructor(props){ 
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default LoginContainer
