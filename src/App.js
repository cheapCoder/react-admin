import React from 'react';
import { BrowserRouter, Route, Link, Redirect,Switch } from "react-router-dom";

import Login from './containers/Login/Login.jsx'
import Admin from './containers/Admin/Admin.jsx'


export default class App extends React.Component {



  render() {

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route  path="/login" component={Login} />
            <Route  path="/admin" component={Admin} />
            <Redirect to="/admin"></Redirect>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}