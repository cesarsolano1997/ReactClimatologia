import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import HttpClient from '../../services/HttpClient';

import {
    LOGIN, 
    AUTENTICADO,
    NOT_AUTENTICADO,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        usuario: '',
        autenticado: false
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const signIn = user => {
        HttpClient.post('Login', user).then(response => {
            if (response.valid) {
                dispatch({
                    type: LOGIN,
                    payload: response
                });
            }
        }).catch(error => {
            console.log('error', error)
        });
    }

    const userAuthenticate = () => {
        HttpClient.get('Usuario').then(response => {
      
            if (response.valid) {
                dispatch({
                    type: AUTENTICADO,
                    payload: response
                });
            }else{
                dispatch({
                    type: NOT_AUTENTICADO
                })
            }
        }).catch(error => {
            dispatch({
                type: NOT_AUTENTICADO
            })
        });
    }

    const signOff = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                usuario: state.usuario,
                autenticado: state.autenticado,
                signIn,
                userAuthenticate,
                signOff
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;