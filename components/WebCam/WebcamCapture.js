import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from "react-router-dom";
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Alert } from "reactstrap";
// redux 
//import configureStore from "store.js"
import { useDispatch, Provider, useSelector } from "react-redux";
import { selectCameraImage } from 'features/cameraSlice';
import { setCameraImage } from 'features/cameraSlice';
import { selectUserToken } from 'features/userSlice';

//CSS
import "./Webcam.css"

const videoConstraints = {
    width: window.screen.availWidth/1.5, 
    height: window.screen.availHeight/1.5,
    facingMode: "user"
};

function WebcamCapture() {

    const cameraImage = useSelector(selectCameraImage);
    const userToken = useSelector(selectUserToken);
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const [retake, setRetake] = useState(false);

    const capture  = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push('/preview');
        //console.log(imageSrc);
        //setImage(imageSrc);

    },[webcamRef]);

    useEffect (() => {

        if(!userToken)
        {
            history.replace("/landing-page");
        }

        if (cameraImage != null)
        {
            setTimeout(function () {
                console.log("Take another picture");
                setRetake(true);
            }.bind(this), 10000)
        }
    },[cameraImage])

    const onDismiss = () => {
        setRetake(false);
    }
    return (
        <>
        {/* <Provider store = {configureStore}> */}
        <div className="app">
            <div className="webcamCapture">
                <Alert isOpen={retake} toggle={onDismiss} className="alert-with-icon" color="success">
                    <span data-notify="icon" className="tim-icons icon-bell-55" />
                    <span>
                        <b>Time is up! - </b>
                        Please take another picture now!"
                    </span>
                </Alert>

                <Webcam
                audio={false}
                height={videoConstraints.height}
                width={videoConstraints.width}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                />

                <RadioButtonUncheckedIcon 
                    className="webcamCapture_button" 
                    onClick={capture}
                    fontSize="large"
                />
                
            </div>    
        </div>    
        {/* </Provider>    */}
        </>
    )

    

}

export default WebcamCapture;