import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import ChatContext from './chat';
import { actions as messagesAction } from '../slices/messagesSlice';
import { actions as channelAction, selectors } from '../slices/channelsSlice';

const SocketProvider = ({ socket, children }) => {
  const [currentChannel, setCurrentChannel] = useState({ id: 1, name: 'general' });
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);

  socket.on('newMessage', (message) => {
    dispatch(messagesAction.addMessage(message));
  });
  socket.on('newChannel', (name) => {
    dispatch(channelAction.addChannel(name));
    setCurrentChannel(name);
  });
  socket.on('removeChannel', (payload) => {
    dispatch(channelAction.removeChannel(payload.id));
    setCurrentChannel(channels[0]);
  });
  socket.on('renameChannel', (payload) => {
    dispatch(channelAction.renameChannel({ id: payload.id, changes: payload }));
  });

  const createSocketMessage = useCallback((event, data) => new Promise(
    (resolve, reject) => {
      socket.timeout(5000).volatile.emit(event, data, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    },
  ), [socket]);

  const chatApi = {
    sendNewMessage: (message) => createSocketMessage('newMessage', message),
    sendNewChannel: (name) => createSocketMessage('newChannel', { name }),
    removeChannel: (id) => createSocketMessage('removeChannel', { id }),
    renameChannel: (id, name) => createSocketMessage('renameChannel', { id, name }),
  };

  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ChatContext.Provider value={{ chatApi, currentChannel, setCurrentChannel }}>
      {children}
    </ChatContext.Provider>
  );
};

export default SocketProvider;
