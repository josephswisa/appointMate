import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Typography, TextField, Button, Paper, Box} from "@mui/material";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AppointmentTypesTable from "./AppointmentTypesTable";
import AppointmentsTable from "./AppointmentsTable"


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    field: {
        margin: theme.spacing(1),
        width: "100%",
    },
    submitButton: {
        margin: theme.spacing(2),
    },
}));

export default function Manage(){
    const classes = useStyles();
    const [formData, setFormData] = useState({});
    const [appInfoOpen , setAppInfoOpen] = useState(false)
    const username = Cookies.get('username');
    const userType=Cookies.get('userType');
    const [name,setName] = useState('');
    const [duration,setDuration] = useState('');
    const [price,setPrice] = useState('');
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [appointmentList, setAppointmentList] = useState([]);
    const getAppointmentTypes = 'http://localhost:4000/get-appointment-types'
    const getUsersAppointmentsList = 'http://localhost:4000/show-users-appointments'
    const getBusinessAppointmentsList = 'http://localhost:4000/show-business-appointments'

    useEffect(()=>{
        console.log(userType)
        if(userType === 'Business') {
            async function fetchBusinessData() {

                await axios.post(getAppointmentTypes, {username})
                    .then(response => {
                        const data = response.data
                        setAppointmentTypes(data.appointmentTypes);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                await axios.post(getBusinessAppointmentsList, {username})
                    .then(response =>{
                        setAppointmentList(response.data)

                    })
                    .catch(error =>{
                        console.log(error)
                    })
            }

            fetchBusinessData().then(r => console.log(appointmentTypes, appointmentList))
        } else {
            async function fetchData() {

                await axios.post(getUsersAppointmentsList, {username})
                    .then(response => {
                        const data = response.data
                        console.log(data,"appListUser");
                        setAppointmentList(data)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

            fetchData().then(r => console.log('fetch'))
            console.log(appointmentList,"applist11")
        }

    },[])


    const handleOpen =() =>{
        setAppInfoOpen(true)

    }

    const handleSave =()=> {
        if ((duration % 10 === 0) && (duration >0)) {
            const addAppointmentEndpoint = 'http://localhost:4000/add-appointment-type';
            axios.post(addAppointmentEndpoint, {
                username, name, duration, price
            })
                .then(response => {
                    console.log('sucesssss')
                    console.log(response.data);
                    // setAppointmentTypes(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
            setAppInfoOpen(false)
            window.location.reload();
        }
    }




    if (userType === "Business") {
        return (
            <Paper className={classes.root}>
                <Paper className={classes.root}>
                    <Typography>
                        Appointment Info
                    </Typography>
                    <Box>
                        {
                            (appointmentTypes !== undefined)&&
                            <AppointmentTypesTable data={appointmentTypes} />
                        }
                    </Box>
                    {!appInfoOpen &&
                        <Button onClick={handleOpen}>
                            Add Appointment Info
                        </Button>
                    }
                    {appInfoOpen &&

                        <Paper className={classes.root}>
                            <TextField
                                name="appointmentName"
                                label="Appointment Name"
                                variant="outlined"
                                className={classes.field}
                                value={name}
                                onChange={e=>setName(e.target.value)}
                            />
                            <TextField
                                name="appointmentDuration"
                                label="Duration"
                                variant="outlined"
                                className={classes.field}
                                placeholder="Intervals of 10 minutes"
                                value={duration}
                                onChange={e=>setDuration(e.target.value)}
                            />
                            {
                                (duration% 10 !== 0)&&
                                <Typography>
                                    Duration must be in intervals of 10 minutes
                                </Typography>
                            }
                            <TextField
                                name="appointmentPrice"
                                label="Price"
                                variant="outlined"
                                className={classes.field}
                                value={price}
                                onChange={e=>setPrice(e.target.value)}
                            />
                            <Button onClick={handleSave}>
                                Save Appointment Info
                            </Button>
                        </Paper>
                    }
                </Paper>
                <Box>
                    <AppointmentsTable data={appointmentList} userType={userType}/>
                </Box>
            </Paper>
        );
    } else {
        return (
            <Paper className={classes.root}>
                <AppointmentsTable data={appointmentList} userType={userType}/>
            </Paper>
        )
    }
}


