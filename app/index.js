'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './app.jsx';
import { getAnnotations } from './api/annotations';
import { getDocument }from './api/documents';

let mountNode = document.getElementById('app');

//listen for state changes and sync to storage
let syncStateToStorage = () => {
  let stateStore = store.getState();

  sessionStorage.setItem('appState', JSON.stringify(stateStore));
};

store.subscribe(syncStateToStorage);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  mountNode
);
