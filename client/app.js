import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routes from './common/routes';
import { hot } from 'react-hot-loader'
import './common/global-styles'

const app = () => (
     <Switch>
        {
            routes.map((route, key)=>{
                return <Route key={key} {...route}/> 
            })
        }
    </Switch>
)


export default hot(module)(app);

