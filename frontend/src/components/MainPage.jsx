import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ChannelsContainer from './channel';
import ChatContainer from './chatContainer/chatContainer.jsx';
import { actions as channelsAction } from '../slices/channelsSlice';
import { actions as messagesAction } from '../slices/messagesSlice';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
        dispatch(channelsAction.addChannels(data.channels));
        dispatch(messagesAction.addMessages(data.messages));
      } catch (e) {
        console.log(e);
      }
    };

    fetchContent();
  });

  return (
    <div className="container rounded my-4 h-100 overflow-hidden shadow flex-grow-1">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer />
        <ChatContainer />
      </div>
    </div>
  );
};

export default MainPage;
