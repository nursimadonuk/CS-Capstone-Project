import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
import './Navbar.css'
import { auth } from './firebase'
import { signOut } from "firebase/auth";

function Navbar({ user, username }) {
    let history = useHistory();

    const toLogin = () => {
        history.push('/login')
    }

    const toSignup = () => {
        history.push('/login')
    }

    const toHome = () => {
        signOut(auth)
        history.push('/')
    }

    const toUpload = () => {
        history.push('/imageupload')
    }

    return (
        <div className="app_header">
        <div className="drawer_and_logo">

            <img
            className="app_header_image"
            src="LensCleanse.png"
            alt="Lens Cleanse"
            width='120'
            height='80'
            />
          <h1 className="app_header_h1">Lens Cleanse</h1>     
        </div>
        
        <div class="search-container">
          <form>
            <Input type="text" placeholder="Search.." name="search"/>
            <button type="submit"><i class="fa fa-search"></i></button>
          </form>
        </div>
        
        {user ? (
          // change this part
          <div className='app_logoutContainer'>
            <div className="SignUpButtons">
              <Button variant="contained" color="secondary" onClick={toHome}>Log Out</Button>
            </div>
            <div className="SignUpButtons">
              <Button variant="contained" color="primary" onClick={toUpload}>Upload Image</Button>
            </div>
          </div>
          
           // <AppDrawer user={user} username={user.displayName}/>
        ) : (
          <div className="app_loginContainer">
            <div className="SignUpButtons">
              <Button variant="contained" color="primary" onClick={toLogin}>Sign in</Button>
            </div>
            <div className="SignUpButtons">
              <Button variant="contained" color="primary" onClick={toSignup}>Sign Up</Button>
            </div>
          </div>
        )}


        {/*user ? (
          
          <div className='app_logoutContainer'>
            <div className="SignUpButtons">
              <Button variant="contained" color="secondary" onClick={() => signOut(auth)}>Log Out</Button>
            </div>
            <div className="SignUpButtons">
              <Button variant="contained" color="primary" onClick={()=>signOut(auth)}>Upload Image</Button>
            </div>
          </div>
          
           // <AppDrawer user={user} username={user.displayName}/>
        ) : (
          <div className="app_loginContainer">
            <div className="SignUpButtons">
              <Button variant="contained" color="primary" onClick={() => setOpenSignIn(true)}>Sign in</Button>
            </div>
            <div className="SignUpButtons">
              <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
          </div>
        )*/}
      </div>
    )
}

export default Navbar