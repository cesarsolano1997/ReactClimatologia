import React, { useContext, useEffect } from 'react'
import { Container, Box, TextField, Avatar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../copyright/Copyright';

import useValidacion from '../../hooks/useValidacion';
import validarLogin from '../../validation/validationLogin';
import AuthContext from '../../context/authentication/authContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    pink: {
        color: theme.palette.getContrastText("#E91E63"),
        backgroundColor: "#E91E63",
    },
}));


const STATE_INITIAL = {
    username: '',
    password: ''
}

const Authentication = (props) => {

    const classes = useStyles();

    const authContext = useContext(AuthContext);
    const { signIn, autenticado } = authContext;

    const sendDataUser = () => {
        
        signIn(valores)
    }

    useEffect(() => {
        if(autenticado){
            props.history.push('/dashboard')
        }
        // eslint-disable-next-line
    }, [autenticado])

    const { valores, errores, handleSubmit, handleChange } = useValidacion(STATE_INITIAL, validarLogin, sendDataUser);

    const { username, password } = valores;

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.pink}>
                    <span className="material-icons">
                        https
                    </span>
                </Avatar>
                <Typography component="h1" variant="h5">Inicio de Sesión</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        label="Usuario"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        error={errores.username && true}
                        helperText={errores.username && errores.username}
                        autoComplete="true"
                        fullWidth
                    />
                    <TextField
                        type="password"
                        label="Contraseña"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        error={errores.password && true}
                        helperText={errores.password && errores.password}
                        autoComplete="true"
                        fullWidth
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<span className="material-icons"> login</span>}
                    >
                        Enviar
                    </Button>
                </form>
            </div>
            <Box mt={12}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default Authentication;
