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
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/demo/demo.css";
import "./App.css"
import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import LoginPage from "views/examples/LoginPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import WebcamCapture from "components/WebCam/WebcamCapture.js";
import Preview from "components/WebCam/Preview.js";

// redux 
import {store, persister} from "store.js"
import { Provider } from "react-redux";
import {PersistGate} from "redux-persist/lib/integration/react";

ReactDOM.render(
  <Provider store = {store}>
    <PersistGate loading={null} persistor={persister}>
    <BrowserRouter>
      <Switch>
        <Route path="/components" render={(props) => <Index {...props} />} />
        <Route
          path="/landing-page"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/register"
          render={(props) => <RegisterPage {...props} />}
        />
         <Route
          path="/signin"
          render={(props) => <LoginPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />
        <Route 
          path="/camera" 
          render={(props) => <WebcamCapture {...props} />} 
        />
        <Route 
          path="/preview" 
          render={(props) => <Preview {...props} />} 
        />
        <Redirect from="/" to="/components" />
        
      </Switch>
    </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
