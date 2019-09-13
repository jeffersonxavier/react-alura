import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './css/timeline.css';
import './css/login.css';
import './css/reset.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Login from './components/login';

ReactDOM.render(
  (
    <Router>
      <Route exact path="/" component={Login}/>
      <Route exact path="/timeline" component={App}/>
    </Router>
  ),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
