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
  const [success, setSuccess] = useState(false);
  const [validTerms, setValidTerms] = React.useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);


  ///////////////////
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    if (userToken) {
      history.replace("/profile-page");
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  
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
    
    if(
      validName!==""&&
      validEmail!==""&&
      validPassword!==""&&
      validBrand!==""&&
      validModel!==""&&
      validRegion!=="")
    {
      //send the post request 
      let data = {
        fullName: validName,
        userName: "snikii",
        phoneNumber: validPhone,
        email: validEmail,
        password: validPassword,
        brand: validBrand,
        model: validModel,
        region: validRegion,
        city: validCity
      }

      let resp = "";

      try{
        resp = await api.postRegisterClients(data);
        
        if(resp.status == 1)
        {
          console.log("Successfully registered!", resp.data.token)
          setSuccess(true);

          dispatch(setUserToken(resp.data.token));
          
          dispatch(setUser(resp.data.name));
          
          setTimeout(function () { //Start the timer
    
            history.replace("/profile-page");//After 1 second, set render to true
          }.bind(this), 2000)
          //message.success("User added!");
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
                      <CardTitle tag="h4">Register</CardTitle>
                      
                    </CardHeader>
                    <CardBody>
                    <FormText color="danger">
                          {validationError}
                        </FormText>
                      <Form className="form">
                        <Label>User Details*</Label>
                        {/* <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Full Name"
                            type="text"
                            name="Name"
                            onFocus={(e) => setFullNameFocus(true)}
                            onBlur={(e) => {
                              setFullNameFocus(false)
                              //validate(e);
                            }}
                            onChange={validate}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            name="Email"
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => {
                              //validate(e);
                              setEmailFocus(false);
                            }}
                            onChange={validate}
                          />
                        </InputGroup> */}
                        <FormGroup>
                            {/* <label>Full Name</label> */}
                            <Input placeholder="Full Name*" name="Name" type="text" onChange={validate}/>
                        </FormGroup>
                        <FormGroup>
                            {/* <label>Email</label> */}
                            <Input placeholder="Email*" name="Email" type="email" onChange={validate}/>
                        </FormGroup>
                        <FormGroup>
                            {/* <label>Phone</label> */}
                            <Input placeholder="Phone Number*" name="phone" type="text" onChange={validate}/>
                        </FormGroup>
                        <FormGroup>
                            {/* <label>Phone</label> */}
                            <Input placeholder="Username*" name="User" type="text" onChange={validate}/>
                        </FormGroup>
                        <FormGroup>
                            {/* <label>Password</label> */}
                            <Input placeholder="Password*" name="Password" type="password" onChange={validate}/>
                        </FormGroup>
                        {/* <InputGroup
                          className={classnames({
                            "input-group-focus": phoneFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Phone Number"
                            type="text"
                            name="phone"
                            onFocus={(e) => setPhoneFocus(true)}
                            onBlur={(e) => {
                              setPhoneFocus(false)
                              //validate(e);
                            }}
                            onChange={validate}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            name="Password"
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => {
                              //validate(e);
                              setPasswordFocus(false);
                            }}
                            onChange={validate}
                          />
                        </InputGroup> */}
                        <Label>Oven</Label>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": deviceNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Brand*"
                            type="text"
                            name="Brand"
                            onFocus={(e) => setDeviceNameFocus(true)}
                            onBlur={(e) => {
                              setDeviceNameFocus(false);
                              //validate(e);
                            }}
                            onChange={validate}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": deviceModelFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Model*"
                            type="text"
                            name="Model"
                            onFocus={(e) => setDeviceModelFocus(true)}
                            onBlur={(e) => {
                              //validate(e);
                              setDeviceModelFocus(false)
                            }}
                            onChange={validate}
                          />
                        </InputGroup>
                        <div className="form-row"> 
                          <FormGroup className="col-md-8">
                            <Label for="inputState">Region*</Label>
                            <Input type="select" name="Region" id="inputState" onChange={validate}>
                            <option value="blank"> </option>
                            <option>Afghanistan</option>
                            <option>Albania</option>
                            <option>Algeria</option>
                            <option>American Samoa</option>
                            <option>Andorra</option>
                            <option>Angola</option>
                            <option>Anguilla</option>
                            <option>Antarctica</option>
                            <option>Antigua And Barbuda</option>
                            <option>Argentina</option>
                            <option>Armenia</option>
                            <option>Aruba</option>
                            <option>Australia</option>
                            <option>Austria</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                            <option>Belarus</option>
                            <option>Belgium</option>
                            <option>Belize</option>
                            <option>Benin</option>
                            <option>Bermuda</option>
                            <option>Bhutan</option>
                            <option>Bolivia</option>
                            <option>Bosnia And Herzegovina</option>
                            <option>Botswana</option>
                            <option>Bouvet Island</option>
                            <option>Brazil</option>
                            <option>British Indian Ocean Territory</option>
                            <option>Brunei Darussalam</option>
                            <option>Bulgaria</option>
                            <option>Burkina Faso</option>
                            <option>Burundi</option>
                            <option>Cambodia</option>
                            <option>Cameroon</option>
                            <option>Canada</option>
                            <option>Cape Verde</option>
                            <option>Cayman Islands</option>
                            <option>Central African Republic</option>
                            <option>Chad</option>
                            <option>Chile</option>
                            <option>China</option>
                            <option>Christmas Island</option>
                            <option>Cocos (keeling) Islands</option>
                            <option>Colombia</option>
                            <option>Comoros</option>
                            <option>Congo</option>
                            <option>Congo, The Democratic Republic Of The</option>
                            <option>Cook Islands</option>
                            <option>Costa Rica</option>
                            <option>Cote D'ivoire</option>
                            <option>Croatia</option>
                            <option>Cuba</option>
                            <option>Cyprus</option>
                            <option>Czech Republic</option>
                            <option>Denmark</option>
                            <option>Djibouti</option>
                            <option>Dominica</option>
                            <option>Dominican Republic</option>
                            <option>East Timor</option>
                            <option>Ecuador</option>
                            <option>Egypt</option>
                            <option>El Salvador</option>
                            <option>Equatorial Guinea</option>
                            <option>Eritrea</option>
                            <option>Estonia</option>
                            <option>Ethiopia</option>
                            <option>Falkland Islands (malvinas)</option>
                            <option>Faroe Islands</option>
                            <option>Fiji</option>
                            <option>Finland</option>
                            <option>France</option>
                            <option>French Guiana</option>
                            <option>French Polynesia</option>
                            <option>French Southern Territories</option>
                            <option>Gabon</option>
                            <option>Gambia</option>
                            <option>Georgia</option>
                            <option>Germany</option>
                            <option>Ghana</option>
                            <option>Gibraltar</option>
                            <option>Greece</option>
                            <option>Greenland</option>
                            <option>Grenada</option>
                            <option>Guadeloupe</option>
                            <option>Guam</option>
                            <option>Guatemala</option>
                            <option>Guinea</option>
                            <option>Guinea-bissau</option>
                            <option>Guyana</option>
                            <option>Haiti</option>
                            <option>Heard Island And Mcdonald Islands</option>
                            <option>Holy See (vatican City State)</option>
                            <option>Honduras</option>
                            <option>Hong Kong</option>
                            <option>Hungary</option>
                            <option>Iceland</option>
                            <option>India</option>
                            <option>Indonesia</option>
                            <option>Iran, Islamic Republic Of</option>
                            <option>Iraq</option>
                            <option>Ireland</option>
                            <option>Israel</option>
                            <option>Italy</option>
                            <option>Jamaica</option>
                            <option>Japan</option>
                            <option>Jordan</option>
                            <option>Kazakstan</option>
                            <option>Kenya</option>
                            <option>Kiribati</option>
                            <option>Korea, Democratic People's Republic Of</option>
                            <option>Korea, Republic Of</option>
                            <option>Kosovo</option>
                            <option>Kuwait</option>
                            <option>Kyrgyzstan</option>
                            <option>Lao People's Democratic Republic</option>
                            <option>Latvia</option>
                            <option>Lebanon</option>
                            <option>Lesotho</option>
                            <option>Liberia</option>
                            <option>Libyan Arab Jamahiriya</option>
                            <option>Liechtenstein</option>
                            <option>Lithuania</option>
                            <option>Luxembourg</option>
                            <option>Macau</option>
                            <option>Macedonia, The Former Yugoslav Republic Of</option>
                            <option>Madagascar</option>
                            <option>Malawi</option>
                            <option>Malaysia</option>
                            <option>Maldives</option>
                            <option>Mali</option>
                            <option>Malta</option>
                            <option>Marshall Islands</option>
                            <option>Martinique</option>
                            <option>Mauritania</option>
                            <option>Mauritius</option>
                            <option>Mayotte</option>
                            <option>Mexico</option>
                            <option>Micronesia, Federated States Of</option>
                            <option>Moldova, Republic Of</option>
                            <option>Monaco</option>
                            <option>Mongolia</option>
                            <option>Montserrat</option>
                            <option>Montenegro</option>
                            <option>Morocco</option>
                            <option>Mozambique</option>
                            <option>Myanmar</option>
                            <option>Namibia</option>
                            <option>Nauru</option>
                            <option>Nepal</option>
                            <option>Netherlands</option>
                            <option>Netherlands Antilles</option>
                            <option>New Caledonia</option>
                            <option>New Zealand</option>
                            <option>Nicaragua</option>
                            <option>Niger</option>
                            <option>Nigeria</option>
                            <option>Niue</option>
                            <option>Norfolk Island</option>
                            <option>Northern Mariana Islands</option>
                            <option>Norway</option>
                            <option>Oman</option>
                            <option>Pakistan</option>
                            <option>Palau</option>
                            <option>Palestinian Territory, Occupied</option>
                            <option>Panama</option>
                            <option>Papua New Guinea</option>
                            <option>Paraguay</option>
                            <option>Peru</option>
                            <option>Philippines</option>
                            <option>Pitcairn</option>
                            <option>Poland</option>
                            <option>Portugal</option>
                            <option>Puerto Rico</option>
                            <option>Qatar</option>
                            <option>Reunion</option>
                            <option>Romania</option>
                            <option>Russian Federation</option>
                            <option>Rwanda</option>
                            <option>Saint Helena</option>
                            <option>Saint Kitts And Nevis</option>
                            <option>Saint Lucia</option>
                            <option>Saint Pierre And Miquelon</option>
                            <option>Saint Vincent And The Grenadines</option>
                            <option>Samoa</option>
                            <option>San Marino</option>
                            <option>Sao Tome And Principe</option>
                            <option>Saudi Arabia</option>
                            <option>Senegal</option>
                            <option>Serbia</option>
                            <option>Seychelles</option>
                            <option>Sierra Leone</option>
                            <option>Singapore</option>
                            <option>Slovakia</option>
                            <option>Slovenia</option>
                            <option>Solomon Islands</option>
                            <option>Somalia</option>
                            <option>South Africa</option>
                            <option>South Georgia And The South Sandwich Islands</option>
                            <option>Spain</option>
                            <option>Sri Lanka</option>
                            <option>Sudan</option>
                            <option>Suriname</option>
                            <option>Svalbard And Jan Mayen</option>
                            <option>Swaziland</option>
                            <option>Sweden</option>
                            <option>Switzerland</option>
                            <option>Syrian Arab Republic</option>
                            <option>Taiwan, Province Of China</option>
                            <option>Tajikistan</option>
                            <option>Tanzania, United Republic Of</option>
                            <option>Thailand</option>
                            <option>Togo</option>
                            <option>Tokelau</option>
                            <option>Tonga</option>
                            <option>Trinidad And Tobago</option>
                            <option>Tunisia</option>
                            <option>Turkey</option>
                            <option>Turkmenistan</option>
                            <option>Turks And Caicos Islands</option>
                            <option>Tuvalu</option>
                            <option>Uganda</option>
                            <option>Ukraine</option>
                            <option>United Arab Emirates</option>
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>United States Minor Outlying Islands</option>
                            <option>Uruguay</option>
                            <option>Uzbekistan</option>
                            <option>Vanuatu</option>
                            <option>Venezuela</option>
                            <option>Viet Nam</option>
                            <option>Virgin Islands, British</option>
                            <option>Virgin Islands, U.s.</option>
                            <option>Wallis And Futuna</option>
                            <option>Western Sahara</option>
                            <option>Yemen</option>
                            <option>Zambia</option>
                            <option>Zimbabwe</option>

                            </Input>
                          </FormGroup>
                          <FormGroup className="col-md-4">
                            <Label for="inputCity">City</Label>
                            <Input type="text" name="City" id="inputCity" onChange={validate}/>
                          </FormGroup>
                          <FormGroup style={{left: "5%", bottom: "10%"}}>
                          <FormText color="muted">
                            * required fields.
                          </FormText>
                        </FormGroup>
                        </div>
                        
                        {/* <FormGroup check className="text-left">
                          <Label check>
                            <Input name="Terms" type="checkbox" onChange={validate}/>
                            <span className="form-check-sign" />I agree to the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                            terms and conditions
                            </a>
                            .
                          </Label>
                        </FormGroup> */}
                        
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button className="btn-round" color="primary" size="lg" onClick={submit}>
                        Get Started
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
