import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
interface Transaction{
    id: number;
    value: number;
    debitedAccountId: number;
    creditedAccountId: number;
    createdAt: string;
}

interface DenseTableProps { 
    transactions: Transaction[];
}

export default function DenseTable(Props: DenseTableProps) {
    const { transactions } = Props;

    return (
        <TableContainer component={Paper} sx={{backgroundColor: "white"}}>
        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>From</TableCell>
                <TableCell align="right">To user</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Date</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {transactions.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.debitedAccountId}
                </TableCell>
                <TableCell align="right">{row.creditedAccountId}</TableCell>
                <TableCell align="right">${row.value}</TableCell>
                <TableCell align="right">{dateFormater(row.createdAt)}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

function dateFormater(date: string) {
    //format from datetime to date
    const newDate = new Date(date);
    console.log(date);
    return newDate.toLocaleDateString();
}