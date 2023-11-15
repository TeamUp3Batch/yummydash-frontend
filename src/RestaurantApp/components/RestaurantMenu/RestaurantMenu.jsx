import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Title from "../RestaurantTitle";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  addMenuItemToRestaurant,
  getMenuItemsByRestaurant,
  deleteMenuItem,
  updateMenuItemToRestaurant,
} from "../../../services/partnerService";

const RestaurantMenu = () => {
  const { loggedInPartner } = useSelector((state) => state.partner);
  const restaurantId = loggedInPartner.restaurantId;
  const [menuDetails, setMenuDetailsDetails] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingMenuItemId, setEditingMenuItemId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    restaurantId: restaurantId,
  });
  const myStyles = {
    width: "100%",
    marginBottom: "16px",
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

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const savedMenuDetials = await addMenuItemToRestaurant(formData);
      if (savedMenuDetials) {
        setMenuDetailsDetails(savedMenuDetials.menu);
      } else {
        console.error("Error saving address: Unexpected response.");
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }

    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      restaurantId: restaurantId,
    });
    setShowForm(false);
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
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      restaurantId: restaurantId,
    });
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

  const handleSaveEdit = async () => {
    try {
      const editedMenuDetails = await updateMenuItemToRestaurant(formData);

      if (editedMenuDetails) {
        setMenuDetailsDetails(editedMenuDetails.menu);
      } else {
        console.error("Error editing menu item: Unexpected response.");
      }
    } catch (error) {
      console.error("Error editing menu item:", error);
    }

    resetForm();
    setEditingMenuItemId(null);
    setShowForm(false);
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(null);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md">
        <DialogTitle>Add New Menu</DialogTitle>
        <DialogContent>
          <div style={myStyles}>
            <TextField
              label="Menu Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div style={myStyles}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
          <div style={myStyles}>
            <TextField
              label="Price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              fullWidth
              required
            />
          </div>
          <div style={myStyles}>
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>
        </DialogContent>
        <DialogActions>
          {editingMenuItemId ? (
            <>
              <Button onClick={handleSaveEdit}>Edit Save</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          ) : (
            <>
              <Button onClick={handleAddItem}>Save</Button>
              <Button onClick={() => setShowForm(false)}>Cancel</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Title>Menu Item</Title>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
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
      <Button onClick={() => setShowForm(true)}>Add New Menu</Button>
    </div>
  );
};

export default RestaurantMenu;
