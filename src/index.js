
/*!
=========================================================
* Argon Design System React - v1.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import MediaQuery from 'react-responsive'

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Landing from "views/Landing.js";
import CapsuleMaker from "views/CapsuleMaker.js";
import CapsuleViewer from "views/CapsuleViewer.js";
import About from "views/About.js";
import Register from "views/Register.js";
import Login from "views/examples/Login.js";
import Share from "views/Share";

import LandingMobile from "views/LandingMobile.js";
import CapsicumMakerMobile from "views/CapsicumMakerMobile.js";
import CapsicumViewerMobile from "views/CapsicumViewerMobile.js";
import ShareMobile from "views/ShareMobile";

ReactDOM.render(
  <div>
    {/* minWidth 1224 corresponds to returning desktop/laptop experience */}
    <MediaQuery minWidth={1224}>
      <HashRouter>
        <Switch>
            <Route path="/" exact render={props => <Landing {...props} />} />
            <Route path="/register"  render={props => <Register {...props} />} />
            <Route path="/capsule-maker"  render={props => <CapsuleMaker {...props} />} />
            <Route path="/viewer/:capsicumID" render={props => <CapsuleViewer {...props} />} />
            <Route path="/about" render={props => <About {...props} />} />
            <Route path="/share/:capsicumID" render={props => <Share {...props} />} />
            <Route path="/login-page" render={props => <Login {...props} />} />
            <Redirect to="/" /> 
        </Switch>
      </HashRouter>
    </MediaQuery>
    <MediaQuery minWidth={300} orientation="portrait">
      <HashRouter>
        <Switch>
          <Route path="/" exact render={props => <LandingMobile {...props} />} />
          <Route path="/capsule-maker" exact render={props => <CapsicumMakerMobile {...props} />} />
          <Route path="/viewer/:capsicumID" render={props => <CapsicumViewerMobile {...props} />} />
          <Route path="/share/:capsicumID" render={props => <ShareMobile {...props} />} />
          <Redirect to="/" /> 
        </Switch>
      </HashRouter>
    </MediaQuery>
  </div>,
  document.getElementById("root")
);