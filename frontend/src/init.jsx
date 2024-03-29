import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import ru from './locales/ru.js';
import App from './components/App.js';
import store from './slices/index';
import { actions as messagesAction } from './slices/messagesSlice';
import { actions as canalAction } from './slices/channelsSlice';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources: {
        ru,
      },
      fallbackLng: ['ru'],
    });

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesAction.addMessage(payload));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(canalAction.addChannel(data));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(canalAction.removeChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(canalAction.renameChannel({ id: payload.id, changes: { name: payload.name } }));
  });

  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: 'process.env.REACT_APP_ROLLBAR_TOKEN',
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <React.StrictMode>
          <I18nextProvider i18n={i18n}>
            <Provider store={store}>
              <BrowserRouter>
                <App socket={socket} />
              </BrowserRouter>
            </Provider>
          </I18nextProvider>
        </React.StrictMode>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
