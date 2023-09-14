import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, FormControl, FormLabel, FormGroup, FormControlLabel, Switch, TextField, Button } from '@material-ui/core';
import axios from "axios";
import {isStrongUsername, isStrongPassword} from "../Utils/utils";
import {Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [isBusiness, setIsBusiness] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name , setName]= useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [logo, setLogo]= useState('');
    const [type, setType]= useState('');
    const [address, setAddress]= useState('');
    const [error,setError] = useState('');
    const [open, setOpen] = useState(false);
    const [signUpTry,setSignUpTry] = useState(false);

    const handleAlert = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2000); // 2 seconds
    };

    const handleSwitchChange = () => {
        setIsBusiness(!isBusiness);
    };

    const handleSubmit = () => {
        if (!isStrongUsername(username)) {
            setError('Invalid username');
            return
        }
        if (!isStrongPassword(password)) {
            setError('Password must contain at least 6 characters')
            return
        }
        if(password === repeatPassword) {
            let userType = 'Client';
            if (isBusiness) {
                if(username !== '' && password !== '' && email !== '' && name !== '' && type !== '' && logo !== '' && address !== '') {
                    userType = 'Business'
                    const signupEndpoint = 'http://localhost:4000/signup-business';
                    axios.post(signupEndpoint, {
                        username, password, email, userType, name, type, logo, address
                    })
                        .then(response => {
                            window.location.href = '/login';
                        })
                        .catch(error => {
                            setError(error.response.data.message)
                            handleAlert();
                        });
                }else {
                    setSignUpTry(true)
                    setTimeout(() => {
                        setSignUpTry(false);
                    }, 1000); // 2 seconds
                }
            } else {
                const signupEndpoint = 'http://localhost:4000/signup';
                if(username !== '' && password !== '' && email !== '' && name !== ''){
                axios.post(signupEndpoint, {
                    username, password, email, name, userType
                })
                    .then(response => {

                        window.location.href = '/login';
                    })
                    .catch(error => {

                        setError(error.response.data.message)
                        handleAlert();
                    });
            } else {
                    setSignUpTry(true)
                    setTimeout(() => {
                        setSignUpTry(false);
                    }, 1000); // 2 seconds
                }
            }
        } else {
            setError('Passwords does not match');
            handleAlert();
        }
    }

    return (
        <Paper className={classes.root}>
            {open&&
                <Alert severity="error">
                    {error}
                </Alert>
            }
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Register as a:</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={isBusiness} onChange={handleSwitchChange} />}
                        label={isBusiness ? 'Business' : 'Client'}
                    />
                </FormGroup>
            </FormControl>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={e=>setEmail(e.target.value)}
            />
            {
               (email === '' && signUpTry)&&
                <Typography>
                    E-mail field must be filled
                </Typography>
            }
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={e=>setName(e.target.value)}
            />
            {
                (name === '' && signUpTry)&&
                <Typography>
                    Name field must be filled
                </Typography>
            }
            <TextField
                fullWidth
                margin="normal"
                label={"Username"}
                value={username}
                onChange={e=>setUsername(e.target.value)}
            />
            {
                (username === '' && signUpTry)&&
                <Typography>
                    Username field must be filled
                </Typography>
            }
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />
            {
                (password === '' && signUpTry)&&
                <Typography>
                    Password field must be filled
                </Typography>
            }
            <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                value={repeatPassword}
                onChange={e=>setRepeatPassword(e.target.value)}
            />
            {
                (repeatPassword === '' && signUpTry)&&
                <Typography>
                    Confirm Password field must be filled
                </Typography>
            }
            {isBusiness && (
                <>
                    <TextField
                        label="Business Type"
                        fullWidth
                        margin="normal"
                        value={type}
                        onChange={e=>setType(e.target.value)}

                    />
                    {
                        (type === '' && signUpTry)&&
                        <Typography>
                           business type field must be filled
                        </Typography>
                    }
                    <TextField
                        label="Logo"
                        fullWidth
                        margin="normal"
                        value={logo}
                        onChange={e=>setLogo(e.target.value)}
                    />
                    {
                        (logo === '' && signUpTry)&&
                        <Typography>
                            Logo field must be filled
                        </Typography>
                    }
                    <TextField
                        label="Address"
                        fullWidth
                        margin="normal"
                        value={address}
                        onChange={e=>setAddress(e.target.value)}
                    />
                    {
                        (address === '' && signUpTry)&&
                        <Typography>
                            Address field must be filled
                        </Typography>
                    }
                </>
            )}

            <Button variant="contained" color="primary" className={classes.submitButton} onClick={handleSubmit}>
                Register
            </Button>
        </Paper>
    );
}
