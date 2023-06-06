import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import store from './slices/index';
import App from './components/App.js';
import './index.css';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const socket = io();
  root.render(await (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App socket={socket} />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>));
};

app();
