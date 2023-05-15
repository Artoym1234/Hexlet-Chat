import {
  Button,
} from 'react-bootstrap';
import React, {
  useContext, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../slices/channelsSlice';
import ChatContext from '../../contexts/chat';
import getModal from '../modals/index';
import ChannelItem from './ChannelItem';

const renderModal = (modalInfo, hideModal) => {
  if (modalInfo.type === null) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return <Component onHide={hideModal} channel={modalInfo.channel} />;
};

const ChannelsContainer = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const chatContext = useContext(ChatContext);
  const { currentChannel, setCurrentChannel } = chatContext;
  const [modalInfo, setModalInfo] = useState({ type: null, channelId: null });
  const showModal = (nameModal, channel = null) => setModalInfo({ type: nameModal, channel });
  const hideModal = () => setModalInfo({ type: null, channel: null });

  return (
    <>
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <b>{t('channels.title')}</b>
        <Button
          variant="light"
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => showModal('adding')}
        >
          <PlusSquare height="20" width="20" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 flex-nowrap">
        {channels.map((channel) => (
          <ChannelItem
            key={channel.id}
            channel={channel}
            currentChannel={currentChannel}
            setCurrentChannel={setCurrentChannel}
            showModal={showModal}
          />
        ))}
      </ul>
      {renderModal(modalInfo, hideModal)}
    </>
  );
};
export default ChannelsContainer;
