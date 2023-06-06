import {
  Button,
} from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions, selectors, actions as channelsAction } from '../../../slices/channelsSlice';
import ChannelItem from './ChannelItem';
import { actions as modalActions } from '../../../slices/modalSlice.js';

const ChannelsContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);

  const activeChannelId = useSelector((state) => {
    const { currentChannelId } = state.channels;
    return currentChannelId;
  });

  useEffect(() => {
    dispatch(channelsAction.addChannels(channels));
  });

  const handleClick = (id) => {
    dispatch(channelsActions.setCurrentChannelId(id));
  };

  const handleAdd = () => {
    dispatch(modalActions.open({ type: 'adding' }));
  };

  const handleRename = (id, name) => () => {
    const context = {
      channelId: id,
      channelName: name,
    };
    dispatch(modalActions.open({ type: 'renaming', context }));
  };

  const handleRemove = (id, name) => () => {
    const context = {
      channelId: id,
      channelName: name,
    };

    dispatch(modalActions.open({ type: 'removing', context }));
  };

  const lastChannelsIdx = channels.length;
  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <b>{t('channels.title')}</b>
        <Button
          variant="light"
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleAdd}
        >
          <PlusSquare height="20" width="20" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav secondary flex-column nav-pills nav-fill px-2 flex-nowrap">
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            activeChannelId={activeChannelId}
            handleClick={(id) => handleClick(id)}
            lastChannelsIdx={lastChannelsIdx}
            handleRename={handleRename(channel.id, channel)}
            handleRemove={handleRemove(channel.id, channel)}
          />
        ))}
      </ul>
    </>
  );
};
export default ChannelsContainer;
