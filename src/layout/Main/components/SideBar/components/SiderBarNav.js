import React, { useState, useEffect } from 'react';
import { List } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles'
import MenuItems from './MenuItems';
import HttpClient from '../../../../../services/HttpClient';

const useStyles = makeStyles(theme => 
    createStyles({
        appMenu: {
            width: '100%',
        },
    })
);

const SideBarNav = React.memo(() => {

    const classes = useStyles();

    const [menu, setMenu] = useState([]);

    useEffect(() => {

        HttpClient.get("Menu").then(response =>{
            setMenu(response.data)
        });
    },[])

    return (
        <List component="nav" className={classes.appMenu} disablePadding>
            {menu.map((item, index) => (
                <MenuItems
                    key={index}
                    {...item}
                />
            ))}
        </List>
    )
})

export default SideBarNav;
