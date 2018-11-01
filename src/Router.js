// @flow

import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App.js';
import Login from './Login.js';
import Register from './Register.js';
import JoinFamily from './JoinFamily.js';
import CreateFamily from './JoinFamily.js';
import SearchFamily from './JoinFamily.js';
import Swipe from './Swipe.js';
import Create from './Create.js';
import Detail from './Detail.js';
import Favorite from './Favorite.js';


export default class Router extends React.Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/register/join' component={JoinFamily}/>
          <Route exact path='/register/create' component={CreateFamily}/>
          <Route exact path='/register/search' component={SearchFamily}/>
          <Route exact path='/swipe' component={Swipe}/>
          <Route exact path='/create' component={Create}/>
          <Route exact path='/detail' component={Detail}/>
          <Route exact path='/favorite' component={Favorite}/>        
        </Switch>
      </BrowserRouter>
    );
  }
}
