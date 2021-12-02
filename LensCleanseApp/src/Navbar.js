import React, { useState } from 'react';
import './Navbar.css';
import { useHistory } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from '@material-ui/core';

import AppDrawer from './components/AppDrawer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import Slide from '@mui/material/Slide';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NewProfile from './Newprofile';

function Navbar({ user, username }) {
  let history = useHistory();

  const [openProfile, setOpenProfile] = useState(false);

  const profileView = () => {
    if(openProfile) {
      setOpenProfile(false)
    } else {
      setOpenProfile(true)
    }    
  }

  const closeProfile = () => {
    setOpenProfile(false);
    history.go(0);
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const toLogin = () => {
    history.push('/login')
  }

  const toAbout = () => {
    history.push('/about')
  }

  const toHome = () => {
    history.push('/')
  }

  return (
    <div className='navbar'>
      <Dialog
        fullScreen
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        TransitionComponent={Transition}
        className="profile-dialog"
      >
        <center className='profile-nav-heading'>

          <div className="profile-nav">
            <div className="profile-nav-left">
              <img
                className="app_header_image"
                src="LensCleanse.png"
                alt="Lens Cleanse"
                width='80'
                height='auto'
              />
              <h1 className="app_header_h1">{username}</h1>
            </div>

            <IconButton
                className="x-button"
                color="inherit"
                onClick={closeProfile}
                aria-label="close"
              >
                <CloseIcon />
            </IconButton>
          </div>

        </center>

        <NewProfile profileusername={username} profileuser={user}></NewProfile>

      </Dialog>
      <a onClick={toHome} alt="Go to Homepage">
        <div className='logo-and-lc'>
          <img
            className="navbar-logo"
            src="LensCleanse.png"
            alt="Lens Cleanse"
            width='75'
            height='auto'
          />
          <h1 className='navbar-lc'>Lens Cleanse</h1>
        </div>
      </a>

      <div className='navbar-right'>
        {/* items aligned to the right of the navbar */}

        <Form className="search-bar">
          <Button className='search-button' variant="outline-success"><SearchIcon /></Button>
          <FormControl
            type="search"
            placeholder="Search"
            className="search-input"
            aria-label="Search"
          />
        </Form>

        {user ? (
          <div className='signed-in'>
            <Button style={{color: "#195c79"}}><NotificationsIcon /></Button>
            <Button style={{color: "#195c79"}}><ChatIcon /></Button>
            <Button style={{color: "#195c79"}} onClick={profileView}><AccountBoxIcon /></Button>
            <AppDrawer user={user} username={username}></AppDrawer>
          </div>
        ) : (
          // sign in sign up buttons
          <div className='not-signed-in'>
            <Button className='signin-button' variant="contained" color="primary" onClick={toLogin}>Sign in<br />Sign up</Button>
            <Button className='signin-button' variant="contained" color="primary" onClick={toAbout}>About</Button>

          </div>
        )}


      </div>
    </div>
  );
}

export default Navbar;