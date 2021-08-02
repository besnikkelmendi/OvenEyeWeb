import {combineReducers} from 'redux';
import { setCameraImage, resetCameraImage } from "./cameraSlice";
import { setUserToken, resetUserToken, setUser, resetUser } from "./userSlice";

export default combineReducers({

    setUserToken: setUserToken, 
    resetUserToken: resetUserToken, 
    setUser: setUser, 
    resetUser: resetUser,
    setCameraImage: setCameraImage,
    resetCameraImage: resetCameraImage

});
