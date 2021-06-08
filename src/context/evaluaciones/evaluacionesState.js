import React, { useReducer } from 'react';
import EvaluacionesContext from './evaluacionesContext';
import EvaluacionesReducer from './evaluacionesReducer';
import HttpClient from '../../services/HttpClient';
import moment from 'moment';

import {
    LISTAR_EVALUACIONES,
    LISTAR_FILTRADOS,
    NUMERO_MESES
} from '../../types';

const EvaluacionesState = props => {

    const initialState = {
        evaluaciones: [],
        filtrados: [],
        meses: []
    }

    const [state, dispatch] = useReducer(EvaluacionesReducer, initialState);

    const ObtenerEvaluaciones = (IdFundo, IdOperacion, FechaInicio, FechaFin, Consulta) => {

        HttpClient.get("evaluaciones", {
            params: {
                "IdFundo": IdFundo,
                "IdOperacion": IdOperacion,
                "FechaInicio": FechaInicio,
                "FechaFin": FechaFin,
                "Consulta": Consulta
            }

        }).then(response => {
            if (response.valid) {
                dispatch({
                    type: LISTAR_EVALUACIONES,
                    payload: response.data
                });

                dispatch({
                    type: LISTAR_FILTRADOS,
                    payload: response.data
                });

                dispatch({
                    type: NUMERO_MESES,
                    payload: moment(FechaFin).diff(moment(FechaInicio),'month')
                });

            }

        });
    }

    return (
        <EvaluacionesContext.Provider
            value={{ 
                evaluaciones: state.evaluaciones,
                filtrados: state.filtrados,
                meses: state.meses,
                ObtenerEvaluaciones
            }}
        >
            { props.children}
        </EvaluacionesContext.Provider >
    );
}

export default EvaluacionesState;