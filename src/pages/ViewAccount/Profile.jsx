
import * as React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';
import "@fortawesome/fontawesome-free/css/all.min.css";
import EditIcon from '@mui/icons-material/EditOutlined';
import EditLink from '@mui/material/Link';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const Profile = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const { loggedInUser, error } = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <Header />
        <div  style={{ height: '50%', width: '100%' }}>
          <br />
          <h1 align="center" > Account Settings</h1>
          <br />
        </div>
        
        <div style={{ height: 500, width: '100%' }}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              centered
            >
              <Tab label="My Account" {...a11yProps(0)} />
              <Tab label="Password" {...a11yProps(1)} />
            </Tabs>
              <TabPanel value={value} index={0} dir={theme.direction} >
                <div style={{ textAlign: 'center' }}>
                    <span> Full Name: </span>
                    <span>{loggedInUser.firstName.toUpperCase()} </span>
                    <span> {loggedInUser.lastName.toUpperCase()} </span> 
                    <span> 
                      <EditIcon color='primary' fontSize='small'></EditIcon>
                      <EditLink
                        component="button"
                        variant="body1"
                        onClick={() => {
                          console.info("I'm a button.");
                        }}
                    >
                        Edit Profile
                      </EditLink>
                  </span> 
                    <br />
                    <span>Phone Number: </span> {loggedInUser.phoneNumber}
                    <br />
                    <span>Email: </span> {loggedInUser.email}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <div style={{ textAlign: 'center' }}>
                  <h3>Reset Your Password</h3>
                  <p>Enter your email address to reset your password. <br />
                  You may need to check your spam folder or unblock <br />
                  support@yummydash.com 
                  </p>
                  <br />
                  <TextField id="outlined-basic" label={loggedInUser.email} variant="outlined" /> <br /><br />
                  <Button variant="contained" >  Reset Password</Button>
                </div>
              </TabPanel>
          </Box>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
