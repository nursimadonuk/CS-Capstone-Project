import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login'
import Profile from './Profile'
import ImageUpload from './ImageUpload';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component = {App}/>
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/imageupload">
            <ImageUpload />
        </Route>
        <Route default component={App} />
      </Switch>
      
    </div>
  </Router>

  ,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
