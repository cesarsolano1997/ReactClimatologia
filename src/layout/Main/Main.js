import React, { useState, useEffect } from 'react'
import TopBar from './components/TopBar';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery, Button } from '@material-ui/core';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    }, shiftContent: {
        paddingLeft: 240
    },
    content: {
        height: '100%'
    },
}));

const AppNavBar = props => {

    const { children } = props;  

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(true);
    const [connection, setConnection] = useState(null);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const handleSidebar = () => {
        setOpenSidebar(!openSidebar);
    }

    const action = key => (
        <>
            <Button onClick={() => { closeSnackbar(key) }}>
               x
            </Button>
        </>
    );

    useEffect(() => {
        const strConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5000/notificationHub")
            .configureLogging(LogLevel.Information)
            .build();

        setConnection(strConnection);

    }, [])


    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    connection.on('ReceiveMessage', message => {
                        enqueueSnackbar(message.message, {
                            variant: 'info',
                            preventDuplicate: true,
                            persist: true,
                            action
                        });
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
        //eslint-disable-next-line
    }, [connection])

    return (
        <div
            className={clsx({
                [classes.root]: true,
                [classes.shiftContent]: isDesktop ? openSidebar : false
            })}
        >
            <TopBar
                onSidebarOpen={handleSidebarOpen}
                handleSidebar={handleSidebar}
            />

            <SideBar
                onClose={handleSidebarClose}
                open={openSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
            />

            <main className={classes.content} >
                {children}
                <Footer />
            </main>

        </div>
    )
}


export default AppNavBar;
