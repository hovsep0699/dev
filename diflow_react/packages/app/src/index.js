import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import Core from '@distate/core/dist/application/Core';
import SecurityService from '@distate/core/dist/application/security/SecurityService';

async function renderApp() {
  await Core.init();
  if (process.env.NODE_ENV === 'development') {
    window.core = Core;
    window.security = SecurityService;
  }
  ReactDOM.render(<App />, document.getElementById('root'));
}

if (process.env.NODE_ENV !== 'development') {
  console.info(
    `%cLast build: ${process.env.REACT_APP_LAST_MODIFIED}`,
    'border-radius: 2px; background-color: darkblue; color: floralwhite; padding: 2px 5px;'
  );
}

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
