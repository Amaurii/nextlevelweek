import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/';
import CreatePoints from './pages/CreatePoints/index';


const Routes = () => {
    return (
      <BrowserRouter>
        <Route component={Home} path = "/" exact />
        <Route component={CreatePoints} path = "/create-pointer" />
      </BrowserRouter>
    );
}
export default Routes;




