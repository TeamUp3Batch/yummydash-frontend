import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Title from "../RestaurantTitle";
import InputAdornment from "@mui/material/InputAdornment";
import { addMenuItemToRestaurant, getMenuItemsByRestaurant} from '../../../services/restaurantService';



const RestaurantMenu = () => {
  const [menuDetails, setMenuDetailsDetails] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    restaurantId: "test",
  });
  const myStyles = {
    width: '100%', 
    marginBottom: '16px'
  };
  const restaurantId = '6527a6e0fdb8bf79ffc03c4f';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenuItemsByRestaurant(restaurantId);
        setMenuDetailsDetails(data.menuItem);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleAddItem = () => {
    // const result = addMenuItemToRestaurant(formData);
    // console.log('result', result);

    // setRestaurantOrderDetails([...restaurantOrderDetails, result]);
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      restaurantId: "test",
    });
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
     <Dialog
  open={showForm}
  onClose={() => setShowForm(false)}
  maxWidth="md" 
>
  <DialogTitle>Add Item</DialogTitle>
  <DialogContent>
    <div style={myStyles}>
      <TextField
        label="Menu Item Name"
        name="menuItemName"
        value={formData.name}
        onChange={handleChange}
        fullWidth 
      />
    </div>
    <div style={myStyles}>
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
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
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        fullWidth
      />
    </div>
    <div style={myStyles}>
      <TextField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        fullWidth
      />
    </div>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleAddItem}>Save</Button>
    <Button onClick={() => setShowForm(false)}>Cancel</Button>
  </DialogActions>
</Dialog>
    <Title>Menu Item</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> <h3>Menu Item Name</h3></TableCell>
            <TableCell><h3>Description</h3></TableCell>
            <TableCell><h3>Price</h3></TableCell>
            <TableCell><h3>Category</h3></TableCell>
            <TableCell><h3>Actions</h3></TableCell>
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
                <Button>
                 <EditIcon />
                </Button>
                <Button>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={() => setShowForm(true)}>
        Add Item
      </Button>
    </div>
  );
};

export default RestaurantMenu;
