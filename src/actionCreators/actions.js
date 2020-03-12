import {
    AUTHENTICATE_USER,
    STORE_USER_DATA
} from './constants';

export const authenticateUser = (state) => ({
    type: AUTHENTICATE_USER,
    isAuthenticated: state
})

export const storeUserData = (state) => ({
    type: STORE_USER_DATA,
    userData: state
})

