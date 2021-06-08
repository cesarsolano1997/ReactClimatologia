import {
    LOGIN, AUTENTICADO,NOT_AUTENTICADO,CERRAR_SESION
} from '../../types';

export default (state, action) => {
    switch(action.type){
        case LOGIN :
            localStorage.setItem('token', action.payload.data.token)
            return {
                ...state,
                usuario: action.payload.data.nombreCompleto,
                autenticado: true
            }        
        case AUTENTICADO:
            return {
                ...state,
                usuario: action.payload.data.nombreCompleto,
                autenticado: true
            }
        case CERRAR_SESION:
        case NOT_AUTENTICADO:
            localStorage.clear();
            return {
                ...state,
                usuario : null,
                autenticado : false
            }

        default:
            return state;
    }
}