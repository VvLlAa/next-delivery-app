import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delivery } from '@/type/type';
import { router } from 'next/client';
import Button from '@mui/material/Button';

interface PropsDelivery {
  deliveries: Delivery[];
}

const tableHead: string[] = [
  'ID доставки',
  'Статус',
  'Дата создания',
  'Адрес отправки',
  'Адрес доставки',
];

export const BasicTable = ({ deliveries }: PropsDelivery) => {
  const openCardDeliveries = (item: Delivery) => {
    router.push(`/delivery/${item.id}`);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead.map((item, index) => (
                <TableCell key={`${item}-${index}`} align="center">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((item, index) => (
              <TableRow
                key={`${item.id}-${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {item.id}
                </TableCell>
                <TableCell align="center">{item.status}</TableCell>
                <TableCell align="center">{item.createdAt}</TableCell>
                <TableCell align="center">{item.fromAddress}</TableCell>
                <TableCell align="center">{item.toAddress}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => openCardDeliveries(item)}
                    variant="contained"
                  >
                    Подробней
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
