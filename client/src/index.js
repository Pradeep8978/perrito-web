/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/css/demo.css";
import "assets/css/now-ui-dashboard.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
// import LoginPage from "views/examples/LoginPage.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import AdminLayout from "layouts/Admin";
import SignUp from "containers/Signup.container";
import Signin from "containers/Signin.container";
import Axios from 'axios';
import store from './store';

Axios.defaults.headers.Authorization = localStorage.getItem('token');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/index" render={props => <Index {...props} />} />
        <Route
          path="/nucleo-icons"
          render={props => <NucleoIcons {...props} />}
        />
        <Route
          path="/landing-page"
          render={props => <LandingPage {...props} />}
        />
        <Route
          path="/profile"
          render={props => <ProfilePage {...props} />}
        />
        <Route
          path="/login"
          render={props => <Signin {...props} />} />
        <Route
          path="/register"
          render={props => <SignUp {...props} />} />
        {/* <Route path="/Dashboard" render={props => <Dashboard {...props} />} /> */}
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        {/* <Redirect to="/admin/dashboard" /> */}
        <Redirect from="*" to="/index" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
