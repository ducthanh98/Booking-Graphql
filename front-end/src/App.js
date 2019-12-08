import React, { Fragment } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { AuthComponent } from './pages/auth/Auth';
import { Header } from './layouts/header/header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Header></Header>
        <Switch>
          <Redirect exact from="/" to="/auth" />
          <Route path="/auth" component={AuthComponent}></Route>
          <Route path="/events" component={null}></Route>
          <Route path="/bookings" component={null}></Route>
        </Switch>

      </Fragment>
    </BrowserRouter>
  );
}

export default App;
