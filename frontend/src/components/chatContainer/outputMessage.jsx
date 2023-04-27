import { useSelector } from 'react-redux';
import { useContext, useRef, useEffect } from 'react';
import { selectors } from '../../slices/messagesSlice';
import ChatContext from '../../contexts/chat';

const OutputMessages = () => {
  const messages = useSelector(selectors.selectAll);
  const chatContext = useContext(ChatContext);
  const { currentChannelId } = chatContext;
  const lastMessageRef = useRef();

  const filteredMessages = messages.filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [filteredMessages]);

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
