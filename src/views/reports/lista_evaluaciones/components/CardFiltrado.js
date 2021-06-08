import React, { useEffect, useState } from 'react';
import CardTurno from './CardTurno';
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion,
    AccordionSummary,
    Typography,
    Icon as IconMaterial,
    AccordionDetails
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
        display: "flex", 
        flexDirection: "column"
    }
}));

const CardFiltrado = ({ name, data }) => {

    const classes = useStyles();

    // States
    const [turno, setTurno] = useState([]);

    useEffect(() => {

        const ArrTurno = data.map(function DeleteObject(dt) {

            const { Filtrado, ...flData } = dt;

            return flData;
        }).map(dt => dt.Turno);

        const filterTurno = ArrTurno.filter((valor, indice) => {
            return ArrTurno.indexOf(valor) === indice;
        }
        );

        setTurno(filterTurno);

    }, []);


    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<IconMaterial>expand_more</IconMaterial>}
                aria-controls="panel1a-content"
            >
                <Typography className={classes.heading}>Filtrado {name}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                {turno.map((tr, index) => (
                    <CardTurno
                        key={index}
                        name={tr}
                        data={data.map(function DeleteObject(dt) {

                            const { Filtrado, ...flData } = dt;

                            return flData;
                        }).filter(fl => fl.Turno === tr).map(function DeleteObject(dt) {

                            const { Turno, ...flData } = dt;

                            return flData;
                        })}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    )
}

export default CardFiltrado;
