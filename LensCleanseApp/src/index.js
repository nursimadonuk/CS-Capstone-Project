import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NewProfile from './Newprofile'
import Settings from './Settings'
import ImageUpload from './ImageUpload';
import About from './About';
import Signup from './Signup'
import Signin from './Signin';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component = {App}/>
        <Route path="/login" component={Signin} />
        <Route path="/profile" component={NewProfile} />
        <Route path="/imageupload">
            <ImageUpload />
        </Route>
        <Route path="/settings" component={Settings} />
        <Route path="/signup" component={Signup} />
        <Route path="/about" component={About} />
        <Route default component={App} />
      </Switch>
      
    </div>
  </Router>

  ,

  document.getElementById('root')
);

reportWebVitals();
