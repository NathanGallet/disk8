import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import LocalStorage from './LocalStorage';
import { isNull } from 'lodash';

const PrivateRoute = ({ component: Component, ...othersProps }) => (
    <Route
        {...othersProps}
        render={props =>
           !isNull(LocalStorage.getUserInfo('userInformations')) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signup",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
