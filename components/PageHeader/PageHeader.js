/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Container,
  UncontrolledCarousel
} from "reactstrap";
import axios from 'axios'
import api from "../../api/index.jsx"
import WebcamCapture from "components/WebCam/WebcamCapture.js";
import moment from 'moment';
import { Alert, Modal, Button } from "reactstrap";
// redux 
import configureStore from "store.js"
import { useDispatch, Provider, useSelector } from "react-redux";
import { selectCameraImage } from 'features/cameraSlice';
import { setCameraImage } from 'features/cameraSlice';
import { useHistory } from 'react-router-dom';
import { selectUserToken } from "features/userSlice.js";


//var keys = []
function PageHeader(props) {

  const [keys, setKeys] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retake, setRetake] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  const cameraImage = useSelector(selectCameraImage);
  const userToken = useSelector(selectUserToken);
  const history = useHistory();
  var timer;
  const fetchKeys = async () => {
    let data = await api.getImageKeys();
    
    if (data.status === 1) {
      await setKeys(data.keys);
      setTimestamps(data.timestamps);
      setIsLoaded(true)
    }
  };
  const startTimer = () => {
    timer = setInterval(function () {
      fetchKeys();
    }, 5000);
  }
  useEffect(() => {
    fetchKeys();
    //startTimer();
    // axios.get('http://localhost:8080/api/v1/images')
    // .then(res => {
    //   console.log(res)
    //   setKeys(res.data.data)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
    if(userToken != null)
    {
      setLoggedIn(true);
    }
    if (cameraImage != null) {
      setTimeout(function () {
        console.log("Take another picture");
        setRetake(true);
      }.bind(this), 10000);
    }
  }, []);

  const onDismiss = () => {
    setRetake(false);
  }

  const goToCamera = () => {
    history.push("/camera");
  }

  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>

        
        {/* <div className="content-center brand">
          <h1 className="h1-seo">Oven Eye</h1>
          <h3 className="d-none d-sm-block">
            Making your baking process easier, safer and more convenient
          </h3>
          <UncontrolledCarousel
                items={carouselItems}
                indicators={false}
                autoPlay={false}
          />
        </div> */}
        <div class="landing-carousel" align="center" style={{ width: "100%", padding: "5%", marginTop: "10%", top: "10%", marginLeft: "auto", marginRight: "auto", marginBottom: "-0%", borderRadius: "70%" }}>

          {/* Start Mini Modal */}
          <Modal
            modalClassName="modal-mini modal-info modal-mini"
            isOpen={retake}
            toggle={() => setRetake(false)}
          >
            <div className="modal-header justify-content-center">
              <button className="close" onClick={() => setRetake(false)}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="modal-profile">
                <i className="tim-icons icon-bell-55" />
              </div>
            </div>
            <div className="modal-body">
              <p> <b>Time is up! - </b>
              Please take another picture now.</p>
            </div>
            <div className="modal-footer">
              <Button className="btn-neutral" color="link" type="button">
                Back
              </Button>
              <Button
                className="btn-neutral"
                color="link"
                onClick={() => goToCamera()}
                type="button"
              >
                Go
              </Button>
            </div>
          </Modal>
          {/* <Alert isOpen={retake} toggle={onDismiss} className="alert-with-icon" color="success">
            <span data-notify="icon" className="tim-icons icon-bell-55" />
            <span>
              <b>Time is up! - </b>
              Please take another picture now!{<a style={{color: "white"}} href="/camera"> Go to camera </a>}"
            </span>
          </Alert> */}

          <UncontrolledCarousel className="landing-carousel"
            items={[
              {
                src: 'http://localhost:8080/api/v1/image/' + keys[0],
                altText: "Slide 1",
                caption: 'Time: ' + moment(timestamps[0]).format('HH:mm:ss') + ' Date: ' + moment(timestamps[0]).format('DD-MM-YYYY'),
              },
              {
                src: 'http://localhost:8080/api/v1/image/' + keys[1],
                altText: "Slide 2",
                caption: 'Time: ' + moment(timestamps[1]).format('HH:mm:ss') + ' Date: ' + moment(timestamps[1]).format('DD-MM-YYYY'),
              },
              {
                src: 'http://localhost:8080/api/v1/image/' + keys[2],
                altText: "Slide 3",
                caption: 'Time: ' + moment(timestamps[2]).format('HH:mm:ss') + ' Date: ' + moment(timestamps[2]).format('DD-MM-YYYY'),
              },
            ]}
            indicators={false}
            autoPlay={false}
          />

          {/* <div className="content-center brand" style={{backgroundColor: "rgba(0, 0, 0, 0.6)",width: "45%", borderRadius: "10%", padding: "8%", marginTop: "-5%"}}>
            <h1 className="h1-seo">Oven Eye</h1>
            <h3 className="d-none d-sm-block">
              Making your baking process easier, safer and more convenient 
            </h3>
          </div> */}
        </div>


        {/* <WebcamCapture/> */}
      </Container>

    </div>
  );

}

export default PageHeader;
