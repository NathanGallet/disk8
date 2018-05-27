import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from './auth';
import { isNull } from 'lodash';

const PrivateRoute = ({ component: Component, ...othersProps }) => (
    <Route
        {...othersProps}
        render={props =>
           !isNull(Auth.getUserInfo('userInfo')) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
