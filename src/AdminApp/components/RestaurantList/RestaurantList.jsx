import * as React from "react";
import { useState, createContext, useContext } from "react";
import { usePartnerList } from "./hooks/usePartnerList";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import CustomSeparator from "./RestaurantView/RestaurantView";
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

export default function RestaurantList({
  setShowRestaurantView,
  setSelectedRestaurantId,
  handleBreadcrumbClick,
}) {
  const { partnerList, isLoading, isError } = usePartnerList({});
  const handleViewDetails = (restaurantId) => {
    setShowRestaurantView(true);
    setSelectedRestaurantId(restaurantId);
  };

  return (
    <React.Fragment>
      <Breadcrumbs aria-label="breadcrumb">
        {/* <Link color="inherit" onClick={handleBreadcrumbClick}>
          Home
        </Link> */}
        <Typography color="textPrimary">Restaurant List</Typography>
      </Breadcrumbs>
      <div>
        {/* <Title>Partners List</Title> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phone Number</StyledTableCell>
                <StyledTableCell>Details</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {partnerList?.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewDetails(row.restaurantId)}
                    >
                      View Details
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
}
