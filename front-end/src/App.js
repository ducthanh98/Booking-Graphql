import React, { Fragment } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { AuthComponent } from './pages/auth/Auth';
import { Header } from './layouts/header/header';

import AuthContext from './context/auth.context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null,
    }
  }
  login = (token, userId) => {
    this.setState({ token: token, userId: userId });
  }
  logout = () => {
    this.setState({ token: null, userId: null });
  }
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <AuthContext.Provider value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}>
            <Header></Header>
            <Switch>
              <Redirect exact from="/" to="/auth" />
              <Route path="/auth" component={AuthComponent}></Route>
              <Route path="/events" component={null}></Route>
              <Route path="/bookings" component={null}></Route>
            </Switch>
          </AuthContext.Provider>

        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
