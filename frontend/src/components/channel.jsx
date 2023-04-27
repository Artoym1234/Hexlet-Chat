import {
  Button,
} from 'react-bootstrap';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import cn from 'classnames';
import { selectors } from '../slices/channelsSlice';
import ChatContext from '../contexts/chat';

const ChannelsContainer = () => {
  const channels = useSelector(selectors.selectAll);
  const chatContext = useContext(ChatContext);
  const { currentChannelId, setCurrentChannelId } = chatContext;

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <b>Каналы</b>
        <Button
          variant="light"
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare height="20" width="20" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 flex-nowrap">
        {channels.map((channel) => {
          const chanelButtonClassName = cn('w-100 rounded-0 text-start btn', { 'btn-secondary': currentChannelId === channel.id });

          return (
            <li className="nav-item w-100" key={channel.id}>
              <button type="button" onClick={() => setCurrentChannelId(channel.id)} className={chanelButtonClassName}>
                <span className="me-1">#</span>
                {channel.name}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default ChannelsContainer;
