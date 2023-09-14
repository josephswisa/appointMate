import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Grid, Typography, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    card: {
        display: 'flex',
        height: '100%',
        cursor: 'pointer',
    },
    cardMedia: {
        width: 150,
    },
    cardContent: {
        flex: 1,
    },
}));

// const businesses = [
//     {
//         id: 1,
//         name: 'Business 1',
//         image: 'https://via.placeholder.com/150',
//         description: 'This is the first business',
//     },
//     {
//         id: 2,
//         name: 'Business 2',
//         image: 'https://via.placeholder.com/150',
//         description: 'This is the second business',
//     },
//     {
//         id: 3,
//         name: 'Business 3',
//         image: 'https://via.placeholder.com/150',
//         description: 'This is the third business',
//     },
// ];

export default function Home() {
    const classes = useStyles();
    const [searchText, setSearchText] = useState('');
    const [businesses, setBusinesses] = useState('');
    const getBusinessEndPoint = 'http://localhost:4000/get-all-businesses';
    const username = Cookies.get('username')


    // const filteredBusinesses = businesses.filter((business) =>
    //     business.name.toLowerCase().includes(searchText.toLowerCase())
    // );

    useEffect(()=>{
        async function fetchData(){
             await axios.post(getBusinessEndPoint, {username} )
                .then( response => {
                    const data =  response.data
                    setBusinesses(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        fetchData().then(r => console.log(businesses))
        console.log(businesses);

    },[])


    return (
        <div className={classes.root}>
            <TextField
                label="Search"
                variant="outlined"
                margin="normal"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                fullWidth
                style={{ width: '50%' }}
            />
            <Grid container spacing={2}>
                {(businesses.length !== 0) &&
                        businesses.map((business) => (
                            <Grid item xs={12} sm={6} md={4} key={business.id}>
                                <Link to={{pathname :`/business/${business.username}`, state: {data: business}}} style={{textDecoration: 'none'}}>
                                    <Card className={classes.card}>
                                        <CardMedia className={classes.cardMedia} image={business.logo}
                                                   title={business.name}/>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {business.name}
                                            </Typography>
                                            <Typography>{business.address}</Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))
                    }
            </Grid>
        </div>
    );
}
