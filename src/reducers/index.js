import { combineReducers } from 'redux';
import authentication from './authentication';
import spotify from './spotify';

export default combineReducers({
    authentication,
    spotify
})