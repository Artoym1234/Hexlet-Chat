import {
  Button,
} from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { selectors } from '../slices/channelsSlice';
import ChatContext from '../contexts/chat';
import getModal from './modals/index';

const renderModal = (modalInfo, hideModal) => {
  if (modalInfo.type === null) {
    return null;
  }
  const Component = getModal(modalInfo.type);
  return <Component onHide={hideModal} channel={modalInfo.channel} />;
};

const ChannelItem = (props) => {
  const { t } = useTranslation();
  const {
    channel,
    currentChannel,
    setCurrentChannel,
    showModal,
  } = props;

  return (
    <li className="nav-item w-100" key={channel.id}>
      { !channel.removable
        ? (
          <button
            type="button"
            onClick={() => setCurrentChannel(channel)}
            className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
              'btn-secondary': channel.id === currentChannel.id,
            })}
          >
            <span>#</span>
            {' '}
            {channel.name}
          </button>
        )
        : (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              type="button"
              variant={channel.id === currentChannel.id && 'secondary'}
              onClick={() => setCurrentChannel(channel)}
              className="w-100 rounded-0 text-start text-truncate"
            >
              <span className="me-1">#</span>
              {' '}
              {channel.name}
            </Button>
            <Dropdown.Toggle
              split
              variant={channel.id === currentChannel.id && 'secondary'}
              id={`dropdown-split-basic-${channel.id}`}
            >
              <span className="visually-hidden">#</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                href="#"
                onClick={() => showModal('removing', channel)}
              >
                {t('channels.remove')}
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => showModal('renaming', channel)}
              >
                {t('channels.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
    </li>
  );
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
          className="p-0 text-primary btn-group-vertical"
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
