// Reducer for authentication flow
import { AUTHENTICATE_USER, STORE_ACCESS_TOKEN } from '../actionCreators/constants';

const initialState = {
    isAuthenticated: false,
    accessToken: ''
}

export default function (state = initialState, action) {
    console.log('Passing through authentication reducer');
    switch(action.type) {
        case AUTHENTICATE_USER:
            return Object.assign({}, state, {isAuthenticated: action.isAuthenticated});
        case STORE_ACCESS_TOKEN:
            return Object.assign({}, state, {accessToken: action.accessToken});
        default:
            return state;
    }
}