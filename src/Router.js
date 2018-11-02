// @flow

import * as React from 'react';
import {Switch, Route } from 'react-router-dom';

import App from './components/App.js';
import Login from './components/Login';
import Register from './components/Register.js';
import JoinFamily from './components/JoinFamily.js';
import CreateFamily from './components/JoinFamily.js';
import SearchFamily from './components/JoinFamily.js';
import Swipe from './components/Swipe.js';
import Create from './components/Create.js';
import Detail from './components/Detail.js';
import Favorite from './components/Favorite.js';


export default class Router extends React.Component<{}> {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route exact path='/login' component={Login}/>
          {/* <Route exact path='/register' component={Register}/>
          <Route exact path='/register/join' component={JoinFamily}/>
          <Route exact path='/register/create' component={CreateFamily}/>
          <Route exact path='/register/search' component={SearchFamily}/>
          <Route exact path='/swipe' component={Swipe}/>
          <Route exact path='/create' component={Create}/>
          <Route exact path='/detail' component={Detail}/>
          <Route exact path='/favorite' component={Favorite}/> */}
        </Switch>
      </main>
    );
  }
}
