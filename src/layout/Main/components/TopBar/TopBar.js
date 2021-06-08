import React,{ useContext } from 'react';
import AuthContext from '../../../../context/authentication/authContext';
import { Toolbar, AppBar, Typography, IconButton, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    }, flexGrow: {
        flexGrow: 1
    },
    btn_cerrar: {
        color: "#fff"
    }
}));

const TopBar = props => {

    const authContext = useContext(AuthContext);
    const { signOff } = authContext;

    const classes = useStyles();

    const { className, onSidebarOpen, handleSidebar, ...rest } = props;

    return (
        <AppBar
            {...rest}
            position="fixed"
        >
            <Toolbar>
                <IconButton color="inherit" onClick={handleSidebar}>
                    <i className="material-icons">menu</i>
                </IconButton>
                <Typography>Panel de control</Typography>
                <div className={classes.flexGrow}></div>
                <Button
                    className={classes.btn_cerrar}
                    onClick={() => signOff()}>
                    Cerrar sesión
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar
