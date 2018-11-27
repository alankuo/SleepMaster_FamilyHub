import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
} from 'react-router-dom';
import './index.css';
import AppRouter from './Router'
import * as serviceWorker from './serviceWorker';
import Database from './util/Database';
require('./components/EventDetails/ably');

Database.init(false);

ReactDOM.render(
  <HashRouter>
    <div>
      <AppRouter routes={AppRouter} />
    </div>
  </HashRouter >
  ,
  document.getElementById( 'root' ) );
serviceWorker.unregister();