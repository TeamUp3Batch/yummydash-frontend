import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Title from "./Title";

// Generate Order Data
function createData(
  id,
  orderId,
  orderDetails,
  customerDetails,
  pickupAddress,
  deliveryAddress
) {
  return {
    id,
    orderId,
    orderDetails,
    customerDetails,
    pickupAddress,
    deliveryAddress,
  };
}

const rows = [
  createData(
    0,
    "#123455",
    "45$ - 3 items",
    "Alicia Patricia +13062556663",
    "134 seven street",
    "431 3rd Ave N"
  ),
  createData(
    1,
    "#987654",
    "30$ - 2 items",
    "John Smith +14015551234",
    "246 main road",
    "789 Elm St"
  ),
  createData(
    2,
    "#567890",
    "60$ - 4 items",
    "Emily Johnson +12025559876",
    "876 Oak Lane",
    "321 Pine Ave"
  ),
  createData(
    3,
    "#456789",
    "25$ - 1 item",
    "Michael Davis +15043006789",
    "432 Birch St",
    "567 Cedar Road"
  ),
];

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Incoming Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Order Details</TableCell>
            <TableCell>Customer Details</TableCell>
            <TableCell>Pickup Address</TableCell>
            <TableCell>Delivery Address</TableCell>
            <TableCell>Order Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.orderId}</TableCell>
              <TableCell>{row.orderDetails}</TableCell>
              <TableCell>{row.customerDetails}</TableCell>
              <TableCell>{row.pickupAddress}</TableCell>
              <TableCell>{row.deliveryAddress}</TableCell>
              <TableCell>
                <Button style={{ backgroundColor: "green", color: "white" }}>
                  Accept
                </Button>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    marginLeft: "8px",
                  }}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
