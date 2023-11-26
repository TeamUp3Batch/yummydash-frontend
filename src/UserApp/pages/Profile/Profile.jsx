
import React, {useState, useEffect} from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  getUserProfileByEmail,
  updateUserProfile,
} from "../../../services/userService"

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
  const [profileDetails, setProfileDetails] = useState([]);
  const [editingMenuItemId, setEditingMenuItemId] = useState(null);
  const [showForm, setShowForm] =useState(false);
  const [formData, setFormData] =useState({
    firstName:"",
    lastName:"",
    phone:"",
    email:"",
  });

  const myStyles = {
    width: "100%",
    marginBottom: "16px",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfileByEmail(loggedInUser.email);
        setProfileDetails(data.user);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleControlChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { loggedInUser } = useSelector((state) => state.auth);
  const buttonStyle = {
    color: '#FFFFFF',
    backgroundColor: '#F36805', 
  };
  const email = loggedInUser.email;

  const handleUpdateProfile = async () => {
    try {
      const editedUserProfile= await updateUserProfile(formData);
      if (editedUserProfile) {
        setProfileDetails(editedUserProfile.user);
      } else {
        console.error("Error editing user profile: Unexpected response.");
      }
    } catch (error) {
      console.error("Error editing user profile:", error);
    }

    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setFormData({
      firstName:"",
      lastName:"",
      phone:"",
    });
  };
  
  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };


const handleEditProfile = async (emailId) => {
  const eid= emailId
  const profileData = profileDetails;
  
  setFormData({
    firstName: loggedInUser.firstName,
    lastName: loggedInUser.lastName,
    phone: loggedInUser.phoneNumber,
    email: loggedInUser.email

  });

  setShowForm(true);
};
  

  return (
    <React.Fragment>
      <Header />
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md">
        <DialogTitle>Update profile</DialogTitle>
        <DialogContent>
          <div style={myStyles}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleControlChange}
              fullWidth
              required
            />
          </div>
          <div style={myStyles}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleControlChange}
              fullWidth
              required
            />
          </div>
          <div style={myStyles}>
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleControlChange}
              fullWidth
              required
            />
          </div>
        </DialogContent>
        <DialogActions>
              <Button onClick={handleUpdateProfile}>Update</Button>
              <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>

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
                <Button variant="outlined" style={buttonStyle} onClick={()=> handleEditProfile(loggedInUser.email) }>
                  <EditIcon /> Update Profile
                </Button>
            </div>
          </TabPanel>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default Profile;
