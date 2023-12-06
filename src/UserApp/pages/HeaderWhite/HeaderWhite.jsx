import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer'; // Import Drawer component
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import logo from '../../../img/yummyDashLogo.png';
import styles from './headerWhite.module.scss';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HelpIcon from '@mui/icons-material/Help';
import DeliveryAddressDialog from '../../components/DeliveryAddressDialog/DeliveryAddressDialog';
import Typography from '@mui/material/Typography';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { logout } from '../../../slices/authSlice';
import { resetMenuState } from '../../../slices/menuSlice';
import { resetRestaurantState } from '../../../slices/restaurantSlice';

const HeaderWhite = ({ setSorting, setSearchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control the drawer
  const [selectedSearchAddress, setSelectedSearchAddress] = useState('');
  const { loggedInUser } = useSelector((state) => state.auth);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    try {
      dispatch(resetMenuState());
      dispatch(resetRestaurantState());
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const openProfile = () => {
    try {
      navigate('/Profile');
    } catch (error) {
      console.log(error);
    }
  };

  const openViewHistory = () => {
    try {
      navigate('/ViewHistory');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchAddressSelect = (address) => {
    typeof address === 'string'
      ? setSelectedSearchAddress(address)
      : setSelectedSearchAddress(address.userAddress1);
  };

  useEffect(() => {
    const primaryAddress = loggedInUser.address.find(
      (address) => address.isPrimaryAddress === true,
    );
    if (primaryAddress) {
      setSelectedSearchAddress(primaryAddress.userAddress1);
    }
  }, [loggedInUser.address]);

  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logoAddress__group}>
          <img className={styles.logo} src={logo} alt="Logo" />
          <div className={styles.address}>
            <p style={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>
              <DeliveryAddressDialog
                onSelect={handleSearchAddressSelect}
                onSearchAddressSelect={handleSearchAddressSelect}
              />
              {selectedSearchAddress}
            </p>
          </div>
        </div>
        <div className={styles.profile}>
          <AccountCircleSharpIcon
            fontSize="large"
            onClick={toggleDrawer}
            sx={{ color: 'black', fontSize: 55 }}
          />
        </div>
      </div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 240,
          },
        }}>
        <div className={styles.drawerContent}>
          <List sx={style} component="nav" aria-label="nav pages">
            <ListItemText
              primary={
                <Typography variant="h6" color="textPrimary" style={{ padding: '16px' }}>
                  {loggedInUser.firstName.toUpperCase()}
                </Typography>
              }
            />
            <ListItemButton>
              <AccountCircleIcon />
              <ListItemText
                primary="View Account"
                style={{ cursor: 'pointer' }}
                onClick={() => openProfile()}
              />
              <Divider dark />
            </ListItemButton>
            <ListItemButton>
              <ListAltIcon />
              <ListItemText
                primary="Order History"
                style={{ cursor: 'pointer' }}
                onClick={() => openViewHistory()}
              />
              <Divider dark />
            </ListItemButton>
            <ListItemButton>
              <HelpIcon />
              <ListItemText primary="Need Help" />
              <Divider dark />
            </ListItemButton>
            <ListItemButton>
              <LogoutIcon />
              <ListItemText
                primary="Logout"
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
              />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default HeaderWhite;
