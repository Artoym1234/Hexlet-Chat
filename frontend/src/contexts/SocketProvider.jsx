import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { io } from 'socket.io-client';
import ChatContext from './chat';
import { actions as messagesAction } from '../slices/messagesSlice';

const SocketProvider = ({ children }) => {
  const [currentChannelId, setCurrentChannelId] = useState(1);
  const dispatch = useDispatch();

  const socket = io();

  const isConnected = () => socket.on('connect', () => {
    console.log('есть ли коннект', socket.connected);
  });

  const getNewMessage = () => socket.on('newMessage', (message) => {
    dispatch(messagesAction.addMessage(message));
  });

  const sendNewMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      if (response.status !== 'ok') {
        Error(response.status);
      }
    });
  };

  // const memo = useMemo(() => ({
  // isConnected, getNewMessage, sendNewMessage, currentChannelId, setCurrentChannelId,
  // }),[]);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ChatContext.Provider value={{
      isConnected,
      getNewMessage,
      sendNewMessage,
      currentChannelId,
      setCurrentChannelId,
    }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export default SocketProvider;
