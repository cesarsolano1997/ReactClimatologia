import React from 'react';
import { Typography, Link }from '@material-ui/core';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Cesar Solano Robles
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright;
