// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import './index.css';
// import * as serviceWorker from './serviceWorker';
// import { BrowserRouter } from 'react-router-dom';
// import AppRouter from './Router'
//
// ReactDOM.render(
//   <BrowserRouter>
//     <AppRouter history={BrowserRouter} routes={AppRouter} />
//   </BrowserRouter>,
// document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
} from 'react-router-dom';
import App from "./components/App";
import AppRouter from './Router'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <HashRouter>
    <div>
      <AppRouter routes={AppRouter} />
    </div>
  </HashRouter >
,
  document.getElementById( 'root' ) );
serviceWorker.unregister();