import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import Button from "@material-ui/core/Button";


export default function appointmentTypesTable(props) {
    const handleDelete = (id) => {
        const deleteAppointmentTypeEndpoint = 'http://localhost:4000/delete-appointment-type'
        axios.post(deleteAppointmentTypeEndpoint,{id})
            .then( response => {
                 window.location.href = '/manage';
            })
            .catch(error => {
                console.log(error);
            });

    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell >Price</TableCell>
                        <TableCell>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell >{row.duration} Min</TableCell>
                            <TableCell >{row.price} $</TableCell>
                            <TableCell> <Button onClick={() => handleDelete(row._id)}>DELETE </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}