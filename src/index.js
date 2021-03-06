import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import './css/timeline.css';
import './css/login.css';
import './css/reset.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Login from './components/login';
import Logout from './components/logout';

function verifyAuthentication() {
  if (!localStorage.getItem('authToken') || !localStorage.getItem('authToken').length) {
    return <Redirect to="/?msg=É necessário estar logado"></Redirect>
  } else {
    return <App/>
  }
}

ReactDOM.render(
  (
    <BrowserRouter>
      <Route exact path="/" component={Login}/>
      <Route exact path="/logout" component={Logout}/>
      <Route exact path="/timeline" render={verifyAuthentication}/>
      <Route exact path="/timeline/:login" component={App} />
    </BrowserRouter>
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
