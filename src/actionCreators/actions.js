import {
    AUTHENTICATE_USER,
    STORE_USER_DATA,
    STORE_ACCESS_TOKEN,
} from './constants';

export const authenticateUser = (state) => ({
    type: AUTHENTICATE_USER,
    isAuthenticated: state
})

export const storeUserData = (state) => ({
    type: STORE_USER_DATA,
    userData: state
})

export const storeAccessToken = (state) => ({
    type: STORE_ACCESS_TOKEN,
    accessToken: state
})