import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import TuneIcon from '@mui/icons-material/Tune';
import SmsIcon from '@mui/icons-material/Sms';
import Drawer from '@mui/material/Drawer'; // Import Drawer component
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import logo from '../../img/SkipTheDishes_logo.svg';
import flag from '../../img/CanadaFlag.png';
import profile from '../../img/account-default.png';
import LoginButton from '../../components/LoginButton';
import LogoutButton from '../../components/LogoutButton';
import styles from './header.module.scss';


const Header = () => {
  const { loginWithRedirect,isAuthenticated, user,logout } = useAuth0();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control the drawer

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }
  const hello = () =>{
    alert("hello")
  }

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <div className={styles.address}>
          <p>Delivery</p>
          <p>Your Address Here</p>
        </div>
        <div className={styles.search}>
          <input placeholder="Search Cuisines, Restaurants, or Items" />
        </div>
        <div className={styles.sort}>
          <TuneIcon color="action"/>
          <p>Sort</p>
        </div>
        <div className={styles.roundIcon}>
          <SmsIcon color="action"/>
          <img src={flag} alt="Canada" />
        </div>
        <div className={styles.profile}>
          <img src={profile} alt="Profile" onClick={toggleDrawer} />
        </div>
      </div>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}
      PaperProps={{
        sx: {
          width: 240
        }
      }}
      >
        <div className={styles.drawerContent}>
          <List>
            <ListItemText primary={user.name}/>
          <ListItemButton>
              <ListItemText primary="View Account" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Order History" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Need Help" />
            </ListItemButton>
            {isAuthenticated && (
              <ListItem button>
                <ListItemText primary="Logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}/>
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
