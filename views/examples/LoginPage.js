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
import React, { useState } from "react";
import classnames from "classnames";
import api from "../../api/index.jsx";
import axios from 'axios'
import validator from "validator";
import { message } from "antd";
import { useHistory } from 'react-router-dom';
import { useDispatch, Provider, useSelector } from "react-redux";
import { selectUserToken, setUserToken, setUser } from 'features/userSlice';

// reactstrap components
import {
  Modal,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  FormText
} from "reactstrap";
import "../../Form.css"
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import { setUserId } from "features/userSlice.js";

export default function RegisterPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [deviceNameFocus, setDeviceNameFocus] = React.useState(false);
  const [deviceModelFocus, setDeviceModelFocus] = React.useState(false);
  const [phoneFocus, setPhoneFocus] = React.useState(false);
  //VALIDATION
  const [validName, setValidName] = React.useState("");
  const [validEmail, setValidEmail] = React.useState("");
  const [validPassword, setValidPassword] = React.useState("");
  const [validBrand, setValidBrand] = React.useState("");
  const [validModel, setValidModel] = React.useState("");
  const [validRegion, setValidRegion] = React.useState("");
  const [validCity, setValidCity] = React.useState("");
  const [validPhone, setValidPhone] = React.useState("");

  //
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [validationError, setValidationError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [validTerms, setValidTerms] = React.useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);


  ///////////////////
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    if (userToken) {
        console.log("shoot")
        history.replace("/landing-page");
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    },[userToken];
  
  },[userToken, history]);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };
  const validate = (e) => {

    let field = e.target.name;
    let fieldValue = e.target.value;
    switch(field){
      case 'Name':
        if (fieldValue.trim() === '') {
          setValidationError(`${field} is required`);
        }
        if (/[^a-zA-Z -]/.test(fieldValue)) {
          setValidationError(`Name can not contain numbers or special characters`);
        }
        if (fieldValue.trim().length < 3) {
          setValidationError(`Name needs to be at least three characters`);
        }
        
        setValidName(fieldValue);
        if(validator.contains(validationError, "Name"))
        {
          setValidationError("");
        }
        
        break;
      case 'Email':
        if(validator.isEmail(fieldValue)){
          setValidEmail(fieldValue);
          
          setValidationError("");
        }
        else{
          setValidationError("Invalid email format");
        }
        break;
      case 'Password':
        console.log(fieldValue)
        if(fieldValue.length >= 6){
          setValidPassword(fieldValue);
          setValidationError("");
        }
        else{
          setValidationError("Password must be longer than 6 characters");
        }
        break;
      case 'Region':
        console.log("Region: ", fieldValue)
        
        if(fieldValue == "blank"){
          setValidationError("Please select a region")
        }
        else
        {
          setValidRegion(fieldValue);
          if(validator.contains(validationError, "region"))
          {
            setValidationError("");
          }
        }
        break;
      case 'City':
        if(validator.isAlpha(fieldValue)){
        setValidCity(fieldValue);
        }else{setValidationError("City names can not contain special characters");}
        break;
      case 'Model':
        setValidModel(fieldValue);
        break;
      case 'Brand':
        setValidBrand(fieldValue);
        break;
      case 'phone':
        setValidPhone(fieldValue);
        break;  
      case 'Terms':
        console.log(fieldValue);
        if(fieldValue == "on")
        {
          setValidTerms(fieldValue);
        }else{
          return "Please agree to our terms and conditions"
        }
        
        break;
      default:
        console.log(field);
    }

  };

  

  const submit = async (e) => {
    
    if(validEmail!=="" && validPassword!=="")
    {
      //send the post request 
      let data = {
        email: validEmail,
        password: validPassword
      }

      

      try{
        let resp = await axios.post('http://localhost:8080/api/v1/client/login', data)
        console.log("Response: ", resp.data);
        resp = resp.data;
        if(resp.status == 1)
        {
          console.log("Successfully logged in!", resp.data.token)
          setSuccess(true);

          
          
          setTimeout(function () {
                dispatch(setUserToken(resp.data.token));
          
                dispatch(setUser(resp.data.name));

                dispatch(setUserId(resp.data._id));

                history.replace("/profile-page");
          }.bind(this), 2000)

        }
      }
      catch(error)
      {
        // console.log(`${resp.error}`)
        // switch(`${resp.error}`)
        // {
        //   case 'phoneNumber':
        //     message.error("This phone number is already in our file"); 
        //     break;
        //   default:
        //     //message.error("Somethin went wrong!");  
        //   setValidationError("Something went wrong!")
        // }
      }
    }
    else
    {
      setValidationError("Please make sure all the required fields are properly filled");
    }
  }
  return (
    <>
      <IndexNavbar/>
      <div className="wrapper">
        <div className="page-header" style={{bottom:"10%"}}>
          <div className="page-header-image" />
          <div className="content">
            
            <Container>
              {/* Start Mini Modal */}
          <Modal
            modalClassName="modal-mini modal-info modal-mini"
            isOpen={success}
            //toggle={}
          >
            <div className="modal-header justify-content-center">
              {/* <button className="close" onClick={(e) => e.preventDefault()}>
                <i className="tim-icons icon-simple-remove text-white" />
              </button> */}
              <div className="modal-profile">
                <i className="tim-icons icon-check-2" />
              </div>
            </div>
            <div className="modal-body">
              <p> <b>Success!</b><br></br>
              Your account has been successfully registered</p>
            </div>
            <div className="modal-footer">
              {/* <Button className="btn-neutral" color="link" type="button">
                Back
              </Button>
              <Button
                className="btn-neutral"
                color="link"
                onClick={(e) => e.preventDefault()}
                type="button"
              >
                Go
              </Button> */}
            </div>
          </Modal>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png").default}
                      />
                      <CardTitle tag="h4">Login</CardTitle>
                      
                    </CardHeader>
                    <CardBody>
                    <FormText color="danger">
                          {validationError}
                        </FormText>
                      <Form className="form">
                        <label>Login Details</label>
                        <FormGroup>
                            {/* <label>Email</label>  */}
                            <Input placeholder="Email" name="Email" type="email" onChange={validate}/>
                        </FormGroup>
                        {/* <FormGroup>
                            <label>Phone</label>
                            <Input placeholder="Username*" name="User" type="text" onChange={validate}/>
                        </FormGroup> */}
                        <FormGroup>
                            {/* <label>Password</label> */}
                            <Input placeholder="Password" name="Password" type="password" onChange={validate}/>
                        </FormGroup>
                        <label>Not a member yet? <a href="/register">Register</a></label>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button className="btn-round" color="primary" size="lg" onClick={submit}>
                        Sign in
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
