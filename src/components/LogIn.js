import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import {Link} from 'react-router-dom'
import axios from "axios";
import Cookies from "js-cookie";
import {Alert} from "@mui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));

export default function LogIn() {
    const classes = useStyles();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [open, setOpen] = useState(false);

    const handleAlert = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2000); // 2 seconds
    };


    const handleSubmit = async () => {
        const loginEndpoint = 'http://localhost:4000/login';
        axios.post(loginEndpoint, {
            username , password
        })
            .then(response => {
                Cookies.set("username", response.data.username)
                Cookies.set("userType", response.data.userType)
                Cookies.set("userID", response.data._id)
                window.location.href = '/home';
            })
            .catch(error => {
                setError(error.response.data.message)
                handleAlert();
            });
    }
    return (
        <Paper className={classes.root}>
            {open&&
                <Alert severity="error">
                    {error}
                </Alert>
            }
            <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={e=>setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" className={classes.submitButton}  onClick={handleSubmit}>
                Sign In
            </Button>


        </Paper>
    );
}
