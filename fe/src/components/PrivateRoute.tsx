import React from 'react'
import { Route, RouteProps } from 'react-router-dom'
import Container from './Container';

const PrivateRoute = ({ element, ...rest }: RouteProps) => {
    if (!element) return null;
    return (
        <Route {...rest} element={<Container>{element}</Container>}/>
    )
}

export default PrivateRoute
