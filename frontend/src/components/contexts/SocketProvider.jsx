import {
  createContext, useCallback, useContext, useMemo,
} from 'react';

const ChatContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const createSocketMessage = useCallback((event, data) => new Promise(
    (resolve, reject) => {
      socket.timeout(3000).emit(event, data, (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response.data);
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
