import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
import theme from './theme/theme';
import axios from 'axios';
import Routes from './Routes';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AuthState from './context/authentication/authState';

const browserHistory = createBrowserHistory();


const App = () => {

  const { enqueueSnackbar } = useSnackbar();  

  axios.interceptors.response.use(function (response) {
    if (response.data.valid) {
      if (response.data.message !== null) {
        enqueueSnackbar(response.data.message, {
          variant: 'success',
          preventDuplicate: true,
          autoHideDuration : 2500
        })
      }
      if (response.data.data.length === 0) {
        enqueueSnackbar("No existen datos", {
          variant: 'info',
          preventDuplicate: true,
          autoHideDuration : 2500
        });
      }
    } else {
      enqueueSnackbar(response.data.message, {
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration : 2500
      });
    }

    return response.data;

  }, function (error) {

    if (!error.response) {
      enqueueSnackbar('Se perdió la conexión con el servidor', {
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration : 2500
      });

      return Promise.reject(error);
    }

    if (error.response.status === 403 || error.response.status === 401) {
      enqueueSnackbar('Sin autorización', {
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration : 2500
      });
    } else {
      enqueueSnackbar('Ocurrio un problema en el servidor', {
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration : 2500
      });
    }

    return Promise.reject(error);
  });

  return (
    <MuiThemeProvider theme={theme}>
      <AuthState>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </AuthState>
    </MuiThemeProvider>
  );
}

export default function IntegrationNotistack() {

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <App  
      />
    </SnackbarProvider>
  );
};