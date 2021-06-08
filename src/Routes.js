import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RouteWithLayout from './components/RouteWithLayout/RouteWithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from './layout';

import SignInView from './views/security/Authentication';
import DashboardView from './views/dashboard/Dashboard';
import { RealTime as RealTimeView } from './views/reports';
import { ListaEvaluaciones as ListaEvaluacionesView } from './views/reports';

import NotAuthorized from './views/redirects/404';
import NotFound from './views/redirects/not-found';

const Routes = () => {
    return (
        <Switch>
            <Route
                component={SignInView}
                exact
                path="/login"
            />

            <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path="/dashboard"
            />

            <RouteWithLayout
                component={RealTimeView}
                exact
                layout={MainLayout}
                path="/report/real"
            />

            <RouteWithLayout
                component={ListaEvaluacionesView}
                exact
                layout={MainLayout}
                path="/report/lista-evaluaciones"
            />

            <Redirect
                exact
                from="/"
                to="/dashboard"
            />

            <RouteWithLayout
                component={NotAuthorized}
                exact
                layout={MinimalLayout}
                path="/not-authorized"
            />

            <RouteWithLayout
                component={NotFound}
                exact
                layout={MinimalLayout}
                path="/not-found"
            />

            <Redirect 
                to="/not-found" 
            />
        </Switch>
    )
}

export default Routes
