import * as React from 'react';
import {Switch, Route } from 'react-router-dom';

import App from './components/App.js';
import Login from './components/Login';
import Register from './components/Register.js';
import JoinFamily from './components/JoinFamily.js';
import CreateFamily from './components/CreateFamily.js';
import Swipe from './components/Swipe/Swipe.js';
import CreateEvents from './components/CreateEvents.js';
import EventDetails from './components/EventDetails/EventDetails.js';
import FavoriteEvents from './components/FavoriteEvents.js';
import Settings from './components/Settings.js'
import Memories from './components/Memories/Memories.js'
import ResetPassword from './components/ResetPassword.js'


export default class Router extends React.Component<{}> {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/join-family' component={JoinFamily}/>
          <Route exact path='/create-family' component={CreateFamily}/>
          <Route exact path='/discover-event' component={Swipe}/>
          <Route exact path='/create-event' component={CreateEvents}/>
          <Route exact path='/event-details' component={EventDetails}/>
          <Route exact path='/favorite-event' component={FavoriteEvents}/>
          <Route exact path='/settings' component={Settings}/>
          <Route exact path='/memories' component={Memories}/>
          <Route exact path='/reset-password' component={ResetPassword}/>
        </Switch>
      </main>
    );
  }
}
