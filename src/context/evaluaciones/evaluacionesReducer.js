import {
    LISTAR_EVALUACIONES,
    LISTAR_FILTRADOS,
    NUMERO_MESES
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case LISTAR_EVALUACIONES:
            return {
                ...state,
                evaluaciones: action.payload
            }
        case LISTAR_FILTRADOS:

            const ArrFiltrado = action.payload.map(dt => dt.Filtrado);

            const filterFiltrados = ArrFiltrado.filter((valor, indice) => {
                return ArrFiltrado.indexOf(valor) === indice;
            }
            );

            return {
                ...state,
                filtrados: filterFiltrados
            }
        case NUMERO_MESES:

            let meses = []
            for (let i = 1; i <= action.payload + 1; i++) {
                meses.push(i)
            }

            return {
                ...state,
                meses: meses
            }

        default:
            return state;
    }
}