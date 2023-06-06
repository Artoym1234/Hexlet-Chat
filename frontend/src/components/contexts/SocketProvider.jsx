import { useDispatch } from 'react-redux';
import {
  createContext, useCallback, useContext, useMemo,
} from 'react';
import { actions as messagesAction } from '../../slices/messagesSlice';
import { actions as channelAction } from '../../slices/channelsSlice';

const ChatContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    dispatch(messagesAction.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    dispatch(channelAction.addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    dispatch(channelAction.removeChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(channelAction.renameChannel({ id: payload.id, changes: { name: payload.name } }));
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

  const chatApi = useMemo(() => ({
    sendNewMessage: (message) => createSocketMessage('newMessage', message),
    sendNewChannel: (name) => createSocketMessage('newChannel', { name }),
    removeChannel: (id) => createSocketMessage('removeChannel', { id }),
    renameChannel: (id, name) => createSocketMessage('renameChannel', { id, name }),
  }), [createSocketMessage]);

  return (
    <ChatContext.Provider value={chatApi}>
      {children}
    </ChatContext.Provider>
  );
};
export const useChatApi = () => useContext(ChatContext);

export default SocketProvider;
