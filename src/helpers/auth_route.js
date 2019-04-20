import {Route, Redirect} from "react-router-dom";
import React from "react";
import localStorage from "local-storage";

export const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage('jwt_token') ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);