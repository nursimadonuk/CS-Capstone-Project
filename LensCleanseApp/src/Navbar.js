import React from 'react';
import './Navbar.css';
import { useHistory } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from '@material-ui/core';

import AppDrawer from './components/AppDrawer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';



function Navbar({ user, username }) {
    let history = useHistory();

    const toLogin = () => {
        history.push('/login')
    }


    const toAbout = () => {
        history.push('/about')
    }

    return (
        <div className='navbar'>
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
                        <Button><NotificationsIcon /></Button>
                        <Button><ChatIcon /></Button>
                        <AppDrawer user={user} username={username}></AppDrawer>
                    </div>
                ):(
                    // sign in sign up buttons
                    <div className='not-signed-in'>
                        <Button className='signin-button' variant="contained" color="primary" onClick={toLogin}>Sign in<br/>Sign up</Button>
                        <Button className='signin-button' variant="contained" color="primary" onClick={toAbout}>About</Button>

                    </div>
                )}


            </div>
        </div>
    );
}

export default Navbar;