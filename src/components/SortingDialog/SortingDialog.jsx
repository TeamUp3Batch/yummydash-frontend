import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import TuneIcon from "@mui/icons-material/Tune";
import Menu from "@mui/material/Menu"; // Import Menu component
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/joy/Radio";
import axios from "axios";
import { ListItem, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

const SortingDialog = ({ onSelect }) => {
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const { loggedInUser, isLoading, error } = useSelector((state) => state.auth);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const [selectedSort, setSelectedSort] = useState(false);
  const iconRef = useRef(null);
  const [sort, setSort] = useState(null);
  const handleClear = async () =>{
    onSelect('');
  }
  const handleRadioSelect = async (sort) => {
    onSelect(sort); // Call the callback function to update the selected address in the parent component    
  };
 
  const openDialog = () => {
    if (iconRef.current) {
      const iconPosition = iconRef.current.getBoundingClientRect();
      setDialogPosition({
        top: iconPosition.bottom + window.scrollY,
        left: iconPosition.left + window.scrollX,
      });
    }
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const dialogStyle = {
    position: "absolute",
    top: dialogPosition.top,
    left: dialogPosition.left,
    zIndex: 1000,
    width: "300px",
  };

  const innerDialogStyle = {
    position: "absolute",
    top: dialogPosition.top,
    left: dialogPosition.left,
    zIndex: 1000,
    height: "400px",
    width: "350px",
  };
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  const inputStyle = {
    color: "#0C151D",
    fontweight: 400,
    padding: "4px 12px ",
    fontSize: "16px",
    boxSizing: "border-box",
    borderRadius: "1px",
    width: "100%",
    margin: "2px 0px 10px",
  };  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDialogVisible && !iconRef.current.contains(event.target)) {
        closeDialog();
      }
    };

    if (isDialogVisible) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDialogVisible]);

  useEffect(() => {
    const storedSort = loggedInUser.SortData;
    if (storedSort) {
        setSelectedSort(storedSort);
    }
  }, []);

  return (
    <div>
      {/* Use Material-UI's Icon component with 'ArrowDropDown' */}
      <TuneIcon style={{ color: "white", cursor: "pointer" }} 
        color="action"
        ref={iconRef}
        onClick={openDialog} />
      {/* Replace Paper with Menu */}
      <Menu
        anchorEl={iconRef.current} // Use the iconRef as the anchor element
        open={isDialogVisible}
        onClose={closeDialog}
        PaperProps={{
          elevation: 3,
          sx: dialogStyle, // Style for the Menu component
        }}
        style={{width: "200px"}}
      >
       <List>
            <ListItem>
            <ListItemText
                primaryTypographyProps={{ fontSize: "12px" }}
            >
                Sort
            </ListItemText>
            <ListItemText primaryTypographyProps={{ fontSize: "12px" }} style={{'cursor' : 'pointer', 'text-align': 'right'}} onClick={handleClear}>
              Clear
            </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText
                  primaryTypographyProps={{ fontSize: "12px" }}
              >
                  Rating                  
              </ListItemText>
              <Radio
                  selected={selectedSort === 'rating'}
                  onChange={() => handleRadioSelect('rating')}
                  value={sort}
                  name="sort-radio"
                />
            </ListItem>
            <ListItem>
              <ListItemText
                  primaryTypographyProps={{ fontSize: "12px" }}
              >
                  Time Estimation                  
              </ListItemText>
              <Radio
                selected={selectedSort === 'duration'}
                onChange={() => handleRadioSelect('duration')}
                value={sort}
                name="sort-radio"
                />
            </ListItem>
        </List>
      </Menu>
    </div>
  );
};

export default SortingDialog;
