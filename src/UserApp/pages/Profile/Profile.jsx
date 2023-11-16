import * as React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../Header/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Profile = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { loggedInUser } = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <Header />
      <div style={{ height: "50%", width: "100%" }}>
        <br />
        <h1 align="center"> Account Settings</h1>
        <br />
      </div>

      <div style={{ height: 500, width: "100%" }}>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            centered
          >
            <Tab label="My Account" {...a11yProps(0)} />
          </Tabs>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div style={{ textAlign: "center" }}>
              <span> Full Name: </span>
              <span>{loggedInUser.firstName.toUpperCase()} </span>
              <span> {loggedInUser.lastName.toUpperCase()} </span>
              <br />
              <span>Phone Number: </span> {loggedInUser.phoneNumber}
              <br />
              <span>Email: </span> {loggedInUser.email}
              <br />
              <Link to="../main">
                <Button variant="outlined">Back to Restaurant</Button>
              </Link>
            </div>
          </TabPanel>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default Profile;
