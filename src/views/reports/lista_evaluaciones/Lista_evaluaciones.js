import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box
} from '@material-ui/core';
import Form from './components/Form'
import EvaluacionesState from '../../../context/evaluaciones/evaluacionesState';
import ContenidoEvaluaciones from './components/ContenidoEvaluaciones';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '450px',
        display: "flex",
        flexFlow: "row wrap",
        padding: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(4)
        },

        '&>*': {
            flex: "1 100%"
        },

    },
    button: {
        margin: theme.spacing(1),
    },
    item_flex: {
        margin: theme.spacing(1),
        alignItems: "center",
        alignContent: "center"
    }
}));


const ListaEvaluaciones = () => {

    const classes = useStyles();

    return (
        <EvaluacionesState>
            <div className={classes.root}>
                <Form />
                <Box>
                    <ContenidoEvaluaciones />
                </Box>
            </div>
        </EvaluacionesState>
    )
}

export default ListaEvaluaciones
