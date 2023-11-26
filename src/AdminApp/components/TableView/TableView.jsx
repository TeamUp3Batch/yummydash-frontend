import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(item, cost, user_id, order_id) {
  return {
    'order_id': order_id,
    'user_id': user_id,
    'item': item,
    'cost': cost
  };
}

const rows = [];
for (let i = 0; i < 10; i++) {
  rows.push(createData(
    `Item ${i}`,
    Math.floor(Math.random() * 100) + 1,
    Math.floor(Math.random() * 100) + 1,
    Math.floor(Math.random() * 100) + 1
  ));
}

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#145465' }}>
          <TableRow>
          <TableCell style={{ color: 'white' }}>order_id</TableCell>
            <TableCell align="right" style={{ color: 'white' }}>user_id</TableCell>
            <TableCell align="right" style={{ color: 'white' }}>item</TableCell>
            <TableCell align="right" style={{ color: 'white' }}>cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.order_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.order_id}
              </TableCell>
              <TableCell align="right">{row.user_id}</TableCell>
              <TableCell align="right">{row.item}</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
