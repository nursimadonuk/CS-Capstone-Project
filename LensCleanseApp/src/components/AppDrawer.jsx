import React from 'react'
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Avatar from '@material-ui/core/Avatar';
import './AppDrawer.css';
import { auth } from '../firebase'
import { signOut } from "firebase/auth";

import PowerIcon from "../Icons/HeaderIcons/PowerIcon";
import SettingsIcon from "../Icons/HeaderIcons/SettingsIcon";

import HomeIcon from '../Icons/SidebarIcons/HomeIcon';
import TypographyIcon from '../Icons/SidebarIcons/TypographyIcon';
import TablesIcon from '../Icons/SidebarIcons/TablesIcon';
import NotificationsIcon from '../Icons/SidebarIcons/NotificationsIcon';
import ComponentsIcon from '../Icons/SidebarIcons/ComponentsIcon';


function AppDrawer({ user, username }) {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  let history = useHistory();

  const toUpload = () => {
      history.push('/imageupload')
  }

  const toProfile = () => {
    history.push('/profile')
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
              <HomeIcon className='icon'/>
              <p>My Profile</p>
            </div>
          </ListItem>
          <ListItem onClick={toUpload} button key={'Upload Image'}>
            <div className='list-item'>
              <NotificationsIcon className='icon'/>
              <p>Upload Image</p>
            </div>
          </ListItem>
          <ListItem button key={'Drafts'}>
            <div className='list-item'>
              <TypographyIcon className='icon'/>
              <p>Drafts</p>
            </div>
          </ListItem>
          <ListItem button key={'Captured'}>
            <div className='list-item'>
              <ComponentsIcon className='icon'/>
              <p>Captured</p>
            </div>
          </ListItem>
          <ListItem button key={'Collaborate'}>
            <div className='list-item'>
              <TablesIcon className='icon'/>
              <p>Collaborate</p>
            </div>
          </ListItem>
          <ListItem onClick={toSettings} button key={'Settings'}>
            <div className='list-item'>
              <SettingsIcon className='icon'/>
              <p>Settings</p>
            </div>
          </ListItem>
          <ListItem onClick={() => signOut(auth)} button key={'Log Out'}>
            <div className='list-item'>
              <PowerIcon className='icon'/>
              <p>Log Out</p>
            </div>
          </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
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

