import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function AppointmentTypesTable(props) {
    const getAppointmentDetailsEndpoint = 'http://localhost:4000/get-appointment-type-details';

    const convertDateFormat = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        };
        return date.toLocaleString(undefined, options);
    };

    const handleDelete = (id) => {
        const deleteAppointmentEndpoint = 'http://localhost:4000/delete-appointment';
        axios
            .post(deleteAppointmentEndpoint, { id })
            .then((response) => {
                window.location.href = '/manage';
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>{props.userType === 'Business' ? 'Customer' : 'Business'}</TableCell>
                        <TableCell>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row,index) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {convertDateFormat(row.date)}
                            </TableCell>

                            <TableCell>
                                {row.appointmentType.name}
                            </TableCell>
                            <TableCell>
                                {row.appointmentType.price} $
                            </TableCell>
                            <TableCell>
                                {row.appointmentType.duration} Minutes
                            </TableCell>
                            <TableCell>{props.userType === 'Business' ? row.costumer: (<Link to={`/business/${row.business}`}>{row.business}</Link>)}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDelete(row._id)}>DELETE</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}