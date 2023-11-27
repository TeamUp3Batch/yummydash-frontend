import React  from "react";
import { useDriverList } from "./hooks/useDriverList";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../Title";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DriversList() {
  const {
    driverList,
    driverData,
    handleCancel,
    showEditForm,
    setShowEditForm,
    handleChange,
    handleEditDriver,
    handleSaveEdit,
    isLoading,
    isError,
  } = useDriverList({});
  
  const myStyles = {
    width: "100%",
    marginBottom: "16px",
  };
  return (
    <React.Fragment>
      <Title>Drivers List</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Orders Delivered</StyledTableCell>
              <StyledTableCell>Rating</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {driverList?.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>
                  {row.firstName} {row.lastName}
                </StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                <StyledTableCell>{row.ordersDelivered}</StyledTableCell>
                <StyledTableCell>
                  <Rating name="read-only" value={row.userRating} readOnly />
                </StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => handleEditDriver(row._id)}>
                    <EditIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          open={showEditForm}
          onClose={() => setShowEditForm(false)}
          maxWidth="md"
        >
          <DialogTitle>Edit Driver</DialogTitle>
          <DialogContent>
            <div style={myStyles}>
              <TextField
                label="First Name"
                name="firstName"
                value={driverData.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>
            <div style={myStyles}>
              <TextField
                label="Last Name"
                name="lastName"
                value={driverData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>
            <div style={myStyles}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="text"
                value={driverData.phoneNumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </div>
          </DialogContent>
          <DialogActions>
            <>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </React.Fragment>
  );
}
