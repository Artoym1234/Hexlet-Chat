import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ChannelsContainer from './channel';
import ChatContainer from './chatContainer/chatContainer.jsx';
import { actions as channelsAction } from '../slices/channelsSlice';
import { actions as messagesAction } from '../slices/messagesSlice';
import routes from '../routes.js';
import ChatContext from '../contexts/chat';

const MainPage = () => {
  const dispatch = useDispatch();
  const chatContext = useContext(ChatContext);
  const { getNewMessage } = chatContext;
  useEffect(() => {
    const fetchContent = async () => {
      const tokenForRequest = `Bearer ${localStorage.getItem('token')}`;
      try {
        const { data } = await axios.get(routes.usersPath(), {
          headers: {
            Authorization: tokenForRequest,
          },
        });
        dispatch(channelsAction.addChannels(data.channels));
        dispatch(messagesAction.addMessages(data.messages));
      } catch (e) {
        console.log(e);
      }
    };

    fetchContent();
    getNewMessage();
  });

  return (
    <div className="container rounded my-4 h-100 overflow-hidden shadow flex-grow-1">
      <div className="row d-flex flex-row bg-white h-100">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <ChannelsContainer />
        </div>
        <div className="col h-100 p-0">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
