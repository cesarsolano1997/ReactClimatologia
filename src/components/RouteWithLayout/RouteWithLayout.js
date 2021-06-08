import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext';

const RouteWithLayout = props => {

    const { layout: Layout, component: Component, ...rest } = props;

    const authContext = useContext(AuthContext);
    const { autenticado, userAuthenticate } = authContext;

    useEffect(() => {
        userAuthenticate();
        // eslint-disable-next-line
    }, [])
    const token = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={matchProps => !autenticado && !token ? (
                <Redirect to="/login" />
            ) : <Layout>
                    <Component {...matchProps} />
                </Layout>}
        />
    )
}

export default RouteWithLayout;
