import React, { useState, useEffect, useContext } from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { GetCamposAgricolas } from '../../../../actions/evaluacionesAction';
import useCombobox from '../../../../hooks/useCombobox';
import useCombobox2 from '../../../../hooks/useCombobox';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Icon as IconMaterial,
    Box
} from '@material-ui/core';
import EvalContext from '../../../../context/evaluaciones/evaluacionesContext';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    item_flex: {
        margin: theme.spacing(1),
        alignItems: "center",
        alignContent: "center"
    }
}));



const Form = () => {
    const classes = useStyles();

    const evalContext = useContext(EvalContext);
    const { ObtenerEvaluaciones } = evalContext;

    const [zonas, setZonas] = useState([]);
    const [fundos, setFundos] = useState([]);

    const [data, Combo] = useCombobox('Zonas', '', zonas);
    const [dataFun, ComboFundo] = useCombobox2('Fundos', '', fundos);

    useEffect(() => {
        searchCampos(1, 1);
    }, []);

    useEffect(() => {
        if (data) {
            if (data.ID) { searchCampos(data.ID, 2); }
        }
    }, [data])

    const [dateInicio, setDateInicio] = useState(new Date('01/01/2019'));
    const [dateFin, setDateFin] = useState(new Date('06/30/2019'));


    const searchCampos = (Id, Consulta) => {
        if (Consulta === 1) {
            GetCamposAgricolas(Id, Consulta).then(
                respuesta => {
                    setZonas(respuesta.data);
                }
            )
        } else if (Consulta === 2) {
            GetCamposAgricolas(Id, Consulta).then(
                respuesta => {
                    setFundos(respuesta.data);
                }
            )
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        ObtenerEvaluaciones(dataFun.ID, 1, dateInicio, dateFin, 1);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" justifyItems="center" justifyContent="center" flexDirection="row" flexWrap="wrap">
                <div className={classes.item_flex} >
                    <Combo />
                </div>
                <div className={classes.item_flex} >
                    <ComboFundo />
                </div>
                <div className={classes.item_flex}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id='dtInicio'
                            name='dtInicio'
                            label='Fecha Inicio'
                            value={dateInicio}
                            onChange={date => { setDateInicio(date); }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className={classes.item_flex}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id='dtFin'
                            name='dtFin'
                            label='Fecha Fin'
                            value={dateFin}
                            onChange={date => { setDateFin(date); }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className={classes.item_flex}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<IconMaterial> search</IconMaterial>}
                    >
                        Buscar
                </Button>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        startIcon={<IconMaterial> build</IconMaterial>}
                    >
                        Procesar
            </Button>
                </div>
            </Box>
        </form>
    )
}

export default Form
