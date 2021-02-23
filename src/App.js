import React from 'react';
import './App.css';
import { Switch, Route,  withRouter, Redirect } from 'react-router-dom';
import ROUTER from '../src/constants/Router';
import AppLayout from './pages/AppLayout/index';
import Resgiter from './pages/auth/Register';
import login from './pages/auth/login';
import decode from 'jwt-decode';

const checkAuth = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    return false;
  }
  try {
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  }
  catch (e) {
    return false;
  }
  return true;
}

const App = () => {
  return (
    <Switch>
      <Route path={ROUTER.AUTH.LOGIN} component={login}  exact/>
      <Route path={ROUTER.AUTH.REGISTER} component={Resgiter} exact />
      <Route  path={ROUTER.HOME} render={props => (
        checkAuth()
          ? <AppLayout />
          : <Redirect to={{ pathname: ROUTER.AUTH.LOGIN, state: { from: props.location } }} />
      )} />
      
    </Switch>
  );
};

export default  withRouter(App);
