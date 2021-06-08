import React from 'react'
import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SideBarNav from './components/SiderBarNav';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 240,
            [theme.breakpoints.up('lg')]: {
            marginTop: 64,
                height: 'calc(100% - 64px)'
        }
    },
}));

const SideBar = props => {

    const { open, variant, onClose } = props;

    const classes = useStyles();

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            classes={{ paper: classes.drawer }}
            variant={variant}
        >
            <SideBarNav />
        </Drawer>
    )
}

export default SideBar;
