import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFetchMenu } from '../../../../UserApp/pages/MenuPage/hooks/useFetchMenu';
import {
  addMenuItemToRestaurant,
  getMenuItemsByRestaurant,
  deleteMenuItem,
  updateMenuItemToRestaurant,
} from "../../../../services/partnerService";

const RestaurantView = ({ restaurantId, handleBreadcrumbClick, setShowRestaurantView }) => {
  const navigate = useNavigate();
  const [editableDetails, setEditableDetails] = useState({
    name:'',
    cuisine:'',
    restaurantImage:'',
    estimatedDeliveryTime:{
      minEstimatedTime:'',
      medEstimatedTime:'',
      maxEstimatedTime:''
    },
    contact:{
      phone:'',
      email:'',
      website:''
    }


  });
  const [isEditing, setIsEditing] = useState(false);
  //FOR MENU
  const [menuDetails, setMenuDetailsDetails] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingMenuItemId, setEditingMenuItemId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    restaurantId: restaurantId,
  });


  const { restaurantDetails, isLoading, isError } = useFetchMenu({
    restaurantId,
  });

  useEffect(() => {
    if (restaurantDetails) {
      setEditableDetails(restaurantDetails);
    }
  }, [restaurantDetails]);

  const goToRestaurantList = () => {
    setShowRestaurantView(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditableDetails(restaurantDetails);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenuItemsByRestaurant(restaurantId);
        setMenuDetailsDetails(data.menuItem);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSaveClick = () => {
    // Handle save logic, update backend, etc.
    setIsEditing(false);
    // Here, you'd typically handle sending the updated details to the backend.
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name.includes('.')) {
      const [parentField, childField] = name.split('.');
      setEditableDetails({
        ...editableDetails,
        [parentField]: {
          ...editableDetails[parentField],
          [childField]: value,
        },
      });
    } else {
      setEditableDetails({
        ...editableDetails,
        [name]: value,
      });
    }
  };
  const handleEditItem = async (menuItemId) => {
    // Find the menu item by ID
    const menuItemToEdit = menuDetails.find((menu) => menu._id === menuItemId);

    // Set the form data and show the form
    setFormData({
      name: menuItemToEdit.name,
      description: menuItemToEdit.description,
      price: menuItemToEdit.price,
      category: menuItemToEdit.category,
      restaurantId: restaurantId,
      menuID: menuItemToEdit._id,
    });

    setEditingMenuItemId(menuItemId);
    setShowForm(true);
  };

  const handleDeleteItem = async (menuItemId) => {
    const data = {
      menuID: menuItemId,
      restaurantId: restaurantId,
    };

    try {
      const deletedMenuDetails = await deleteMenuItem(data);
      if (deletedMenuDetails) {
        setMenuDetailsDetails(deletedMenuDetails.menu);
        if (deletedMenuDetails.status === "success") {
          setSuccessMessage(deletedMenuDetails.message);
        }
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        console.error("Error deleting menu item: Unexpected response.");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" onClick={goToRestaurantList} style={{ cursor: 'pointer' }}>
          Restaurant List
        </Link>
        <Typography color="textPrimary">Restaurant View</Typography>
      </Breadcrumbs>
      {restaurantDetails ? (
        <Container>
          {/* Basic Details */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Basic Details
              </Typography>
            </Grid>
            <Grid item xs={6} >
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={editableDetails.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              </Grid>
              <Grid item xs={6} >
              <TextField
                name="cuisine"
                label="Cuisine"
                variant="outlined"
                fullWidth
                value={editableDetails.cuisine}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              </Grid>
            
            <Grid item xs={12} >
              <TextField
                name="restaurantImage"
                label="Image URL"
                variant="outlined"
                fullWidth
                value={editableDetails.restaurantImage}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={4}>
                   <TextField
                     name="estimatedDeliveryTime.minEstimatedTime"
                     label="Minimum Estimated Time"
                     variant="outlined"
                     fullWidth
                     value={editableDetails.estimatedDeliveryTime?.minEstimatedTime}
                     onChange={handleInputChange}
                     disabled={!isEditing}
                   />
               </Grid>
               <Grid item xs={4}>
                   <TextField
                     name="estimatedDeliveryTime.medEstimatedTime"
                     label="Medium Estimated Time"
                     variant="outlined"
                     fullWidth
                     value={editableDetails.estimatedDeliveryTime?.medEstimatedTime}
                     onChange={handleInputChange}
                     disabled={!isEditing}
                   />
               </Grid>
               <Grid item xs={4}>
                   <TextField
                     name="estimatedDeliveryTime.maxEstimatedTime"
                     label="Maximum Estimated Time"
                     variant="outlined"
                     fullWidth
                     value={editableDetails.estimatedDeliveryTime?.maxEstimatedTime}
                     onChange={handleInputChange}
                     disabled={!isEditing}
                   />
               </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={editableDetails.description}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Contact Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="contact.phone"
                label="Phone"
                variant="outlined"
                fullWidth
                value={editableDetails.contact?.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="contact.email"
                label="Email"
                variant="outlined"
                fullWidth
                value={editableDetails.contact?.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="contact.website"
                label="Website"
                variant="outlined"
                fullWidth
                value={editableDetails.contact?.website}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
            <Grid item xs={12}>
              {isEditing ? (
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                  Save
                </Button>
              ) : (
                <Button variant="contained" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Menu Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {" "}
              <h3>Menu Item Name</h3>
            </TableCell>
            <TableCell>
              <h3>Description</h3>
            </TableCell>
            <TableCell>
              <h3>Price</h3>
            </TableCell>
            <TableCell>
              <h3>Category</h3>
            </TableCell>
            <TableCell>
              <h3>Actions</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menuDetails.map((menu) => (
            <TableRow key={menu._id}>
              <TableCell>{menu.name}</TableCell>
              <TableCell>{menu.description}</TableCell>
              <TableCell>${menu.price}</TableCell>
              <TableCell>{menu.category}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditItem(menu._id)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDeleteItem(menu._id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            </Grid>
          </Grid>

        
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </React.Fragment>
  );
};

export default RestaurantView;
