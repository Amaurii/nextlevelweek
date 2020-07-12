import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home/';
import CreatePoints from './pages/CreatePoints/index';
import Login from './pages/Login/index';


const Routes = () => {
    return (
      <BrowserRouter>
        <Route component={Home} path = "/" exact />
        <Route component={CreatePoints} path = "/create-pointer" />
        <Route component={Login} path = '/login' />
      </BrowserRouter>
    );
}
export default Routes;




