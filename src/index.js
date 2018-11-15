import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
} from 'react-router-dom';
import './index.css';
import AppRouter from './Router'
import * as serviceWorker from './serviceWorker';
require('./components/EventDetails/ably');

ReactDOM.render(
  <HashRouter>
    <div>
      <AppRouter routes={AppRouter} />
    </div>
  </HashRouter >
  ,
  document.getElementById( 'root' ) );
serviceWorker.unregister();