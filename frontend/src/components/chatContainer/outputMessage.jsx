import { useSelector } from 'react-redux';
import { useContext, useRef } from 'react';
import { selectors } from '../../slices/messagesSlice';
import ChatContext from '../../contexts/chat';

const OutputMessages = () => {
  const messages = useSelector(selectors.selectAll);
  const chatContext = useContext(ChatContext);
  const { currentChannel } = chatContext;
  const lastMessageRef = useRef();
  const filteredMessages = messages.filter((message) => message.channelId === currentChannel.id);

  return (
    <>
      {filteredMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          :
          {
          message.body
          }
        </div>
      ))}
      <span ref={lastMessageRef} />
    </>
  );
};

export default OutputMessages;