
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Header from '../Header/Header';
import Footer from '../../components/Footer/Footer';

import "@fortawesome/fontawesome-free/css/all.min.css";

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


  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <br />
        <h1 align="center" > Account Settings</h1>
        <br />
        </div>
        <div class="col-xs-2 col-sm-6 col-md-4 col-lg-5 col-xl-6">
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          centered
        >
          <Tab label="My Account" {...a11yProps(0)} />
          <Tab label="Password" {...a11yProps(1)} />
          <Tab label="Gift Cards" {...a11yProps(2)} />
          <Tab label="Payment Options" {...a11yProps(3)} />
          <Tab label="Privacy Control" {...a11yProps(4)} />
        </Tabs>
      
      
        <TabPanel value={value} index={0} dir={theme.direction}>
          
          <h2>Name: </h2>
          <p>Phone: </p>
          <p>Email: </p>
          
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Reset your password
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
         <i>Under development!</i> 
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <i>Under development!</i> 
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
        <i>Under development!</i> 
        </TabPanel>
    </Box>

      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
