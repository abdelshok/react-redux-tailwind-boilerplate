// Reducer that will contain all spotify related actions and states
// ie. User's favorite album, personal data, currently playing song, playlist, etc.

import { STORE_USER_DATA } from '../actionCreators/constants';

const initialState = {
    userData: false,
}

export default function (state = initialState, action) {
    console.log('Passing through authentication reducer');
    switch(action.type) {
        case STORE_USER_DATA:
            return Object.assign({}, state, {userData: action.userData});
        default:
            return state;
    }
}