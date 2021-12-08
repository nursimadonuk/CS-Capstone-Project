import React, { useState } from 'react';
import './Navbar.css';
import { auth } from './firebase'
import { signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from '@material-ui/core';

import SearchIcon from '@mui/icons-material/Search';
import Slide from '@mui/material/Slide';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CollectionsIcon from '@mui/icons-material/Collections';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CameraIcon from '@mui/icons-material/Camera';
import InfoIcon from '@mui/icons-material/Info';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LoginIcon from '@mui/icons-material/Login';

import NewProfile from './Newprofile';
import Drafts from './Drafts';
import Captured from './Captured';
import ImageUpload from './ImageUpload';


function Navbar({ user, username }) {
  let history = useHistory();

  const [openProfile, setOpenProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDrafts, setOpenDrafts] = useState(false);
  const [openCaptured, setOpenCaptured] = useState(false);

  const toUpload = () => {
    setOpen(true)
  }

  const closeUpload = () => {
    setOpen(false)
  }

  const handleOpenCaptured = () => {
    setOpenCaptured(!openCaptured);
  }
  const closeCaptured = () => {
    setOpenCaptured(false);
    history.go(0);
  }

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

  const draftsView = () => {
    if(openDrafts) {
      setOpenDrafts(false)
    } else {
      setOpenDrafts(true)
    }   
  }
  const closeDrafts = () => {
    setOpenDrafts(false);
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

      <Dialog
        fullScreen
        open={openCaptured}
        onClose={handleOpenCaptured}
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
              <h1 className="app_header_h1">My Captured Photos</h1>
            </div>

            <IconButton
                className="x-button"
                color="inherit"
                onClick={closeCaptured}
                aria-label="close"
              >
                <CloseIcon />
            </IconButton>
          </div>

        </center>

        <Captured profileusername={username} profileuser={user} ></Captured>
      </Dialog>


      <Dialog 
      open={open} 
      onClose={closeUpload}
      fullWidth={true}
      maxWidth={'md'}>

      <DialogTitle> <h1 className="app_header_h1">Lens Cleanse Image Upload </h1> </DialogTitle>
      <DialogContent>{user?.displayName ? (
        <ImageUpload username={user.displayName} />
        ) : (
        <h3 className="upload-login-message">Login to upload an image...</h3>
        )}</DialogContent>
      </Dialog>

      <Dialog
        fullScreen
        open={openDrafts}
        onClose={() => setOpenDrafts(false)}
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
              <h1 className="app_header_h1">My Drafts</h1>
            </div>

            <IconButton
                className="x-button"
                color="inherit"
                onClick={closeDrafts}
                aria-label="close"
              >
                <CloseIcon />
            </IconButton>
          </div>

        </center>

        <Drafts user={user} username={username}></Drafts>
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
          <h1 className='navbar-lc'>LensCleanse</h1>
        </div>
      </a>

      <div className='navbar-right'>
        {/* items aligned to the right of the navbar */}

        {/*<Form className="search-bar">
          <Button className='search-button' variant="outline-success"><SearchIcon /></Button>
          <FormControl
            type="search"
            placeholder="Search"
            className="search-input"
            aria-label="Search"
          />
        </Form>*/}

        {user ? (
          <div className='signed-in'>
            <Button style={{color: "#195c79"}} className="tooltip" onClick={toUpload}><AddAPhotoIcon /><span className="tooltiptext">Image Upload</span></Button>
            <Button style={{color: "#195c79"}} className="tooltip" onClick={draftsView}><CollectionsIcon /><span className="tooltiptext">My Drafts</span></Button>
            <Button style={{color: "#195c79"}} className="tooltip-capture" onClick={handleOpenCaptured}><CameraIcon /><span className="tooltiptext-capture">Captured Images</span></Button>
            <Button style={{color: "#195c79"}} className="tooltip" onClick={toAbout}><InfoIcon /><span className="tooltiptext">About Us</span></Button>
            <Button style={{color: "#195c79"}} className="tooltip" onClick={profileView}><AccountBoxIcon /><span className="tooltiptext">My Profile</span></Button>
            <Button style={{color: "#195c79"}} className="tooltip-logout" onClick={() => signOut(auth)} ><PowerSettingsNewIcon /><span className="tooltiptext-logout">Log Out</span></Button>
            {/*<AppDrawer user={user} username={username}></AppDrawer>*/}
          </div>
        ) : (
          // sign in sign up buttons
          <div>
            <Button style={{color: "#195c79"}} className="tooltip-signin" onClick={toLogin}><LoginIcon /><span className="tooltiptext-signin">Sign in / Sign up</span></Button>
            <Button style={{color: "#195c79"}} className="tooltip-about" onClick={toAbout}><InfoIcon /><span className="tooltiptext-about">About Us</span></Button>

          </div>
        )}


      </div>
    </div>
  );
}

export default Navbar;