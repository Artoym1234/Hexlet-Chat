import {
  createContext, useCallback, useContext, useMemo,
} from 'react';

const ChatContext = createContext({});

const SocketProvider = ({ socket, children }) => {
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
