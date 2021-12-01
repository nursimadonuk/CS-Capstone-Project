import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ImageUpload from '../ImageUpload';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import './AppDrawer.css';
import { auth } from '../firebase'
import { signOut } from "firebase/auth";

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import CollectionsIcon from '@mui/icons-material/Collections';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CameraIcon from '@mui/icons-material/Camera';
import InfoIcon from '@mui/icons-material/Info';
import NewProfile from '../Newprofile';
import Drafts from '../Drafts';

function AppDrawer({ user, username }) {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openDrafts, setOpenDrafts] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  let history = useHistory();

  const toUpload = () => {
    setOpen(true)
  }

  const closeUpload = () => {
    setOpen(false)
  }

  const toAbout = () => {
    history.push('/about')
  }

  const toSettings = () => {
    history.push('/settings')
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

  const list = (anchor) => (
    <Box
      className='menu-box'
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className='menu-list'>
        {/*<ListItem onClick={profileView} button key={'My Profile'}>
          <div className='list-item'>
            <AccountBoxIcon className='icon' />
            <p> My Profile</p>
          </div>
  </ListItem>*/}
        <ListItem onClick={toUpload} button key={'Upload Image'}>
          <div className='list-item'>
            <InsertPhotoIcon className='icon' />
            <p>Upload Image</p>
          </div>
        </ListItem>
        <ListItem onClick={draftsView} button key={'Drafts'}>
          <div className='list-item'>
            <CollectionsIcon className='icon' />
            <p>Drafts</p>
          </div>
        </ListItem>
        <ListItem button key={'Captured'}>
          <div className='list-item'>
            <CameraIcon className='icon' />
            <p>Captured</p>
          </div>
        </ListItem>
        <ListItem button key={'Collaborate'}>
          <div className='list-item'>
            <SupervisorAccountIcon className='icon' />
            <p>Collaborate</p>
          </div>
        </ListItem>
        <ListItem onClick={toSettings} button key={'Settings'}>
          <div className='list-item'>
            <SettingsIcon className='icon' />
            <p>Settings</p>
          </div>
        </ListItem>
        <ListItem onClick={toAbout} button key={'About'}>
          <div className='list-item'>
            <InfoIcon className='icon' />
            <p>About Us</p>
          </div>
        </ListItem>
        <ListItem onClick={() => signOut(auth)} button key={'Log Out'}>
          <div className='list-item'>
            <PowerSettingsNewIcon className='icon' />
            <p>Log Out</p>
          </div>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
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


      {/*<Dialog
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

      </Dialog>*/}

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

      <React.Fragment className='togglebutton' key={'right'}>
        <Button onClick={toggleDrawer('right', true)}><Avatar className="post_avatar" alt={username} src={"/static/images/avatar/1.jpg"} /></Button>
        <Drawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer('right', false)}
        >
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}


export default AppDrawer

