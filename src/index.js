import React from 'react';
import 'sanitize.css/sanitize.css';
import io from 'socket.io-client';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store/';
import App from './Containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const socket = io();

const target = document.querySelector('#root');

socket.on('hello', ({ message }) => alert(message));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target,
);
registerServiceWorker();
