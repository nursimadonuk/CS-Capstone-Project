import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { Input, makeStyles, Modal } from '@material-ui/core';
import ImageUpload from '../ImageUpload';


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
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 0;
  const left = 10;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, ${left}%)`,
  };
}

function AppDrawer({ user, username }) {

  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [open, setOpen] = useState(false);

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

  const toProfile = () => {
    history.push('/profile')
  }
  const toAbout = () => {
    history.push('/about')
  }

  const toSettings = () => {
    history.push('/settings')
  }

  const list = (anchor) => (
    <Box
      className='menu-box'
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className='menu-list'>
        <ListItem onClick={toProfile} button key={'My Profile'}>
          <div className='list-item'>
            <AccountBoxIcon className='icon' />
            <p>My Profile</p>
          </div>
        </ListItem>
        <ListItem onClick={toUpload} button key={'Upload Image'}>
          <div className='list-item'>
            <InsertPhotoIcon className='icon' />
            <p>Upload Image</p>
          </div>
        </ListItem>
        <ListItem button key={'Drafts'}>
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center className='sign_up_heading'>
              <img
                className="app_header_image"
                src="LensCleanse.png"
                alt="Lens Cleanse"
                width='80'
                height='auto'
              />
              <h1 className="app_header_h1">Lens Cleanse</h1>
            </center>
            {user?.displayName ? (
              <ImageUpload username={user.displayName} />

            ) : (
              <h3 className="upload-login-message">Login to upload an image...</h3>
            )}
          </form>
        </div>
      </Modal>

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

