import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login'
import Profile from './Profile'
import Settings from './Settings'
import ImageUpload from './ImageUpload';
import Signup from './Signup'
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
        <Route path="/settings" component={Settings} />
        <Route path="/signup" component={Signup} />
        <Route default component={App} />
      </Switch>
      
    </div>
  </Router>

  ,

  document.getElementById('root')
);

reportWebVitals();
