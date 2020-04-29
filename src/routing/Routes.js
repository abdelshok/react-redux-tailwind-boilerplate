// External Packages
import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
// Internal Modules
// Containers
// Components
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import UnauthenticatedRoute from '../components/UnauthenticatedRoute';
import LoginContainer from '../containers/LoginContainer';
import AuthenticatedDashboard from '../containers/AuthenticatedDashboard';
// import TestComponent from '../components/TestComponent';

// #toDo: create 404 error page displayed when user can't login.

export default ({childProps}) =>
    <BrowserRouter>
        <Switch>
            <UnauthenticatedRoute path='/' exact component={LoginContainer} props={childProps} /> 
            <AuthenticatedRoute path='/authenticated' exact component={AuthenticatedDashboard} props={childProps} />
        </Switch>
    </BrowserRouter>
