import {combineReducers} from 'redux';
import { auth, userRole } from "./auth.jsx";

export default combineReducers({
    auth:auth,
    userRole: userRole

});