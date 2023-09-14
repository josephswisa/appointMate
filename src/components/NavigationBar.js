import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function NavigationBar() {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const username = Cookies.get('username');

    useEffect(() => {
        if (username !== undefined) {
            setIsLoggedIn(true)
        } else setIsLoggedIn(false)
    }, [username]);

    const handleLogOut = () => {
        setIsLoggedIn(false);
        Cookies.remove('username')
        window.location.href = '/login';
        handleClose();
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderButtons = () => {
        if (isLoggedIn) {
            return (
                <>
                    <MenuItem component={Link} to='/edit-profile' onClick={handleClose}><Button color="inherit">Edit Profile</Button></MenuItem>
                    <MenuItem component={Link} to='/manage' onClick={handleClose}><Button color="inherit">Manage Appointments</Button></MenuItem>
                    <MenuItem onClick={handleLogOut}><Button color="inherit">Log Out</Button></MenuItem>
                </>
            );
        } else {
            return (
                <>
                    <MenuItem component={Link} to='/register' onClick={handleClose}><Button color="inherit">Register</Button></MenuItem>
                    <MenuItem component={Link} to='/login'onClick={handleClose}><Button color="inherit">Log In</Button></MenuItem>
                </>
            );
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenuClick}>
                        <MenuIcon />
                    </IconButton>
                        <Typography variant="h5" className={classes.title} component={Link} to='/home' style={{textDecoration: 'none', color: 'white'}}>
                            AppointMate
                        </Typography>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        {renderButtons()}
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}
