import React from 'react';
import './Navbar.css';
import { useHistory } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from '@material-ui/core';

import PowerIcon from "./Icons/HeaderIcons/PowerIcon";
import BellIcon from "./Icons/HeaderIcons/BellIcon";
import SettingsIcon from "./Icons/HeaderIcons/SettingsIcon";
import MessageIcon from "./Icons/HeaderIcons/MessageIcon";
import BurgerIcon from "./Icons/HeaderIcons/BurgerIcon";
import SearchIcon from "./Icons/HeaderIcons/SearchIcon";
import ArrowIcon from "./Icons/HeaderIcons/ArrowIcon";
import AppDrawer from './components/AppDrawer';

function Navbar({ user, username }) {
    let history = useHistory();

    const toLogin = () => {
        history.push('/login')
    }

    return (
        <div className='navbar'>
            <div className='logo-and-lc'>
                <img
                    className="navbar-logo"
                    src="LensCleanse.png"
                    alt="Lens Cleanse"
                    width='120'
                    height='70'
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
                        <Button><BellIcon /></Button>
                        <Button><MessageIcon /></Button>
                        <AppDrawer user={user} username={username}></AppDrawer>
                    </div>
                ):(
                    // sign in sign up buttons
                    <div className='not-signed-in'>
                        <Button className='signin-button' variant="contained" color="primary" onClick={toLogin}>Sign in<br/>Sign up</Button>
                    </div>
                )}


            </div>
        </div>
    );
}

export default Navbar;