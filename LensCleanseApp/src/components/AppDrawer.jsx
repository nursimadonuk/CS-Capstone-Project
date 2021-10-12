import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@material-ui/core/Avatar';
import './AppDrawer.css';
import { auth } from '../firebase'
import { signOut } from "firebase/auth";


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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem button key={'My Profile'}>
            <ListItemText primary={'My Profile'} />
          </ListItem>
          <ListItem button key={'Inbox'}>
            <ListItemText primary={'Inbox'} />
          </ListItem>
          <ListItem button key={'Friends'}>
            <ListItemText primary={'Friends'} />
          </ListItem>
          <ListItem button key={'Upload Image'}>
            <ListItemText primary={'Upload Image'} />
          </ListItem>
          <ListItem button key={'Drafts'}>
            <ListItemText primary={'Drafts'} />
          </ListItem>
          <ListItem button key={'Starred'}>
            <ListItemText primary={'Starred'} />
          </ListItem>
          <ListItem button key={'Captured'}>
            <ListItemText primary={'Captured'} />
          </ListItem>
          <ListItem button key={'Collaborate'}>
            <ListItemText primary={'Collaborate'} />
          </ListItem>
          <ListItem onClick={() => signOut(auth)} button key={'Log Out'}>
            <ListItemText primary={'Log Out'} />
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

