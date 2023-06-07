import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import InputMessage from './InputMessage.jsx';
import OutputMessages from './OutputMessage.jsx';
import { filteredMessages } from '../../../slices/messagesSlice';
import { useCurrentChannel } from '../../../slices/channelsSlice';

const ChatContainer = () => {
  const { t } = useTranslation();
  const currentMessages = useSelector(filteredMessages);
  const currentChannel = useSelector(useCurrentChannel);
  useEffect(() => {
    const block = document.getElementById('messages-box');
    block.scrollTop = block.scrollHeight;
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {currentChannel && `# ${currentChannel.name}`}
          </b>
        </p>
        <span className="text-muted">
          {t('chat_container.message', { count: currentMessages.length })}
        </span>
      </div>
      <div id="messages-box" className="flex-grow-1 overflow-auto px-5 ">
        <OutputMessages />
      </div>
      <div className="mt-auto px-5 py-3">
        <InputMessage />
      </div>
    </div>
  );
};

export default ChatContainer;
