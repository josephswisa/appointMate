import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button , Paper} from "@mui/material";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import {Alert} from "@mui/lab";


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

export default function EditProfile() {
    const classes = useStyles();
    const [password, setPassword] = useState('');
    const [name , setName]= useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [logo, setLogo]= useState('');
    const [type, setType]= useState('');
    const [address, setAddress]= useState('');
    // const [phone,setPhone]= useState('');
    // const [facebook,setFacebook] = useState('');
    // const [instagram,setInstagram] = useState('');
    const [user,setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [error,setError] = useState('');

    const handleAlert = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2000); // 2 seconds
    };

    const username = Cookies.get('username')
    const userType = Cookies.get('userType')
    const userID = Cookies.get('userID')
    const getUserDetails = 'http://localhost:4000/get-user-details'
    useEffect(()=>{
        async function fetchData(){

            await axios.post(getUserDetails,{username})
                .then( response => {
                    const data =  response.data
                    console.log(data);
                    setUser(data)
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fetchData().then(r => console.log(user))


    },[])



    const handleSubmit = (event) => {
        const updateNameEndpoint = 'http://localhost:4000/update-name'
        const updateLogoEndpoint = 'http://localhost:4000/update-logo'
        const updateTypeEndpoint = 'http://localhost:4000/update-type'
        const updateAddressEndpoint = 'http://localhost:4000/update-address'
        console.log(userID)
        const id = userID;

            if(name !== ''){
                axios.post(updateNameEndpoint , { id, name})
                    .then( response =>{
                        console.log(response.data)
                    })
                    .catch(error =>{
                        console.log(error)
                    })
            }

            if(logo !== ''){
                axios.post(updateLogoEndpoint , { id, logo})
                    .then( response =>{
                        console.log(response.data)
                    })
                    .catch(error =>{
                        console.log(error)
                    })
            }

            if(type !== ''){
                const businessType = type;
                axios.post(updateTypeEndpoint , { id, businessType})
                    .then( response =>{
                        console.log(response.data)
                    })
                    .catch(error =>{
                        console.log(error)
                    })

            }

            if(address !== ''){
                axios.post(updateAddressEndpoint , { id, address})
                    .then( response =>{
                        console.log(response.data)
                    })
                    .catch(error =>{
                        console.log(error)
                    })

            }

            if((password === repeatPassword)&&(password.length > 6)){
                console.log('password change')
            } else if(password !== repeatPassword){
                setError('password does not match!')
                handleAlert()
            } else if (password.length < 6 || repeatPassword.length < 6){
                setError('password length must be over 6')
                handleAlert()
            }



        window.location.href = '/edit-profile';
    };


    if (userType === "Business") {
        return (
            <Paper className={classes.root}>
                <Typography>
                    Hello {user.name}
                </Typography>
                <TextField
                    name="businessName"
                    label="Business Name"
                    variant="outlined"
                    className={classes.field}
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
                <TextField
                    name="businessLogo"
                    label="Business Logo"
                    variant="outlined"
                    className={classes.field}
                    value={logo}
                    onChange={e=>setLogo(e.target.value)}
                />
                <TextField
                    name="businessType"
                    label="Business Type"
                    variant="outlined"
                    className={classes.field}
                    value={type}
                    onChange={e=>setType(e.target.value)}
                />
                <TextField
                    name="businessAddress"
                    label="Business Address"
                    variant="outlined"
                    className={classes.field}
                    value={address}
                    onChange={e=>setAddress(e.target.value)}
                />
                {/*<TextField*/}
                {/*    name="businessPhone"*/}
                {/*    label="Business Phone Number"*/}
                {/*    variant="outlined"*/}
                {/*    className={classes.field}*/}
                {/*    value={phone}*/}
                {/*    onChange={e=>setPhone(e.target.value)}*/}
                {/*/>*/}
                {/*<Paper className={classes.root}>*/}
                {/*    <Typography>*/}
                {/*        Social Information*/}
                {/*    </Typography>*/}
                {/*    <TextField*/}
                {/*        name="facebookLink"*/}
                {/*        label="Facebook link"*/}
                {/*        variant="outlined"*/}
                {/*        className={classes.field}*/}
                {/*        value={facebook}*/}
                {/*        onChange={e=>setFacebook(e.target.value)}*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        name="instagramLink"*/}
                {/*        label="Instagram link"*/}
                {/*        variant="outlined"*/}
                {/*        className={classes.field}*/}
                {/*        value={instagram}*/}
                {/*        onChange={e=>setInstagram(e.target.value)}*/}
                {/*    />*/}
                {/*</Paper>*/}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    sx={{marginTop: 2}}
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
            </Paper>
        )
    } else {
        return (

            <Paper className={classes.root}>
                Hello {user.name}
                {open&&
                    <Alert severity="error">
                        {error}
                    </Alert>
                }
                <TextField
                    name="fullName"
                    label="Full Name"
                    variant="outlined"
                    className={classes.field}
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
                <TextField
                    name="password"
                    label="Password"
                    variant="outlined"
                    className={classes.field}
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    className={classes.field}
                    value={repeatPassword}
                    onChange={e=>setRepeatPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    sx={{marginTop: 2}}
                    onClick={handleSubmit}
                >
                    Save Changes
                </Button>
            </Paper>
        )
    }
}




