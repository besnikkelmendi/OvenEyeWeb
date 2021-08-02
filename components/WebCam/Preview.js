import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setCameraImage } from 'features/cameraSlice';

// redux 
import configureStore from "store.js"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, Provider, useSelector } from "react-redux";
import { selectCameraImage } from 'features/cameraSlice';
import { selectUserId } from 'features/userSlice';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import { resetCameraImage } from 'features/cameraSlice';
import axios from 'axios'
import "./Preview.css"
import classnames from "classnames";
import api from "../../api/index.jsx"
// reactstrap components
import {
    FormGroup,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
  } from "reactstrap";
import { selectUserToken } from 'features/userSlice';
function Preview() {

  
    const initialFormData = Object.freeze({
      food: "",
      cookedLevel: ""
    });

    const [imageSent, setImageSent] = useState(false);
    const [sendInitiated, setSendInitiated] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [modalData, updateModalData] = useState(initialFormData);
    const cameraImage = useSelector(selectCameraImage);
    const userId = useSelector(selectUserId);
    const token = useSelector(selectUserToken);
    const history = useHistory();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!cameraImage) {
            history.replace("/camera");
        }
    }, [cameraImage, history])

    const closePreview = () => {
        dispatch(resetCameraImage());
        //history.replace("/camera");
    }
    const postImage = async () => {
        var data = {
            image: cameraImage,
            food: modalData.food,
            cookedLevel: modalData.cookedLevel,
            userId: userId,
        }
        //var blob = dataURItoBlob(cameraImage)
        const base64 = cameraImage;
        const blob = await fetch(base64).then(res => res.blob());
        //const blob = await base64.blob();
        var formData = new FormData();
        formData.append("image", blob);
        formData.append("food", modalData.food);
        formData.append("cookedLevel", modalData.cookedLevel);
        formData.append("userId", userId);
        console.log("Data: ", data);
        //api.postImage(formData);
        const config = {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        };

        const result = await axios.post('http://localhost:8080/api/v1/image', formData, config)
        console.log("Image: ", result.data);
    }
    const  dataURItoBlob = (dataURI) => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
      
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
      
        return new Blob([ia], {type:mimeString});
      }

    const sendPreview = () => {
        //sendImageToServer
        
        // console.log(cameraImage)
        //postImage();
        //console.log("Result", result);
        // if (result)
        // {
        //console.log("Sent");
        setSendInitiated(true);

        // setTimeout(function () { //Start the timer
        //     setImageSent(false); //After 1 second, set render to true
        // }.bind(this), 10000)
        // }
        
        //dispatch(resetCameraImage());    
    }

    const onDismiss = () => {
        setImageSent(false);
    }
    const toggleModal = () => {
        setImageSent(!imageSent);
    }

    const goToCamera = () => {
        history.replace("/components");
        
    }

    const handleChange = (e) => {
      updateModalData({
        ...modalData,
    
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim()
      });
    };

    const sendAnnotatedImage = async () => {

        postImage();
        setImageSent(true);
        // setTimeout(function () { //Start the timer
        //     setImageSent(false); //After 1 second, set render to true
        // }.bind(this), 10000)
    }
    return (
        <>
            <div className="app">
            <Modal isOpen={imageSent} toggle={toggleModal}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Sent!
                    </h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-hidden="true"
                        onClick={toggleModal}
                    >
                        <i className="tim-icons icon-simple-remove" />
                    </button>
                </div>
                <ModalBody>
                    <p>Your image has now been sent to the server. Please take another picture in 5 minutes. Thank you!</p>
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="secondary" onClick={toggleModal}>
                    Close
                </Button> */}
                    <Button onClick={goToCamera} color="primary">
                        OK
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Start Form Modal */}
          <Modal
            modalClassName="modal-black"
            isOpen={sendInitiated}
            toggle={() => setSendInitiated(false)}
          >
            <div className="modal-header justify-content-center">
              <button className="close" onClick={() => setSendInitiated(false)}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="text-muted text-center ml-auto mr-auto">
                <h3 className="mb-0">Details</h3>
              </div>
            </div>
            <div className="modal-body">
              {/* <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={require("assets/img/github.svg").default}
                  />
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={require("assets/img/google.svg").default}
                  />
                </Button>
              </div> */}
              <div className="text-center text-muted mb-4 mt-3">
                <small>Please provide the details below</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                    <Label for="email">Food</Label>
                  <InputGroup
                    className={classnames("input-group-alternative", {
                      "input-group-focus": emailFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-chart-pie-36" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="food"
                      placeholder="E.g. pizza"
                      type="text"
                      onChange={handleChange}
                      onFocus={(e) => setEmailFocus(true)}
                      onBlur={(e) => setEmailFocus(false)}
                      id="email"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label for="cookedLevel">Cooked level</Label>
                    <Input type="select" onChange={handleChange} name="cookedLevel" id="cookedLevel" className="select_menu">
                    <option value="1">1 - raw</option>
                    <option value="2">2 - undercooked</option>
                    <option value="3">3 - medium</option>
                    <option value="4">4 - done</option>
                    <option value="5">5 - crunchy</option>
                    </Input>
                </FormGroup>
                {/* <FormGroup>
                  <InputGroup
                    className={classnames("input-group-alternative", {
                      "input-group-focus": passwordFocus,
                    })}
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-chart-bar-32" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Cooked Level"
                      type="text"
                      onFocus={(e) => setPasswordFocus(true)}
                      onBlur={(e) => setPasswordFocus(false)}
                    />
                  </InputGroup>
                </FormGroup> */}
                {/* <FormGroup check className="mt-3">
                  <Label check>
                    <Input defaultChecked type="checkbox" />
                    <span className="form-check-sign" />
                    Remember me!
                  </Label>
                </FormGroup> */}
                <div className="text-center">
                  <Button onClick = {sendAnnotatedImage} className="my-4" color="primary" type="button">
                    Send
                  </Button>
                </div>
              </Form>
            </div>
          </Modal>
          {/* End Form Modal */}

            {/* <Alert isOpen={imageSent} toggle={onDismiss} className="alert-with-icon" color="success">
                <span data-notify="icon" className="tim-icons icon-bell-55" />
                <span>
                    <b>Sent! - </b>
                    Your image has now been sent to the server. Please take another picture in 5 minutes. Thank you!"
                </span>
        </Alert> */}
            <div className="preview">

                <CloseIcon onClick={closePreview} className="preview_close" />
                <div onClick={sendPreview} className="send_btn">
                    <h2>Send now </h2>
                    <SendIcon className="preview_send" />
                </div>
                <img src={cameraImage} alt="Preview" />

            </div>

        </div>
        </>
    )
}

export default Preview;