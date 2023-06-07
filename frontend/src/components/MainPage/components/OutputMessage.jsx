import { useRef } from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { filteredMessages } from '../../../slices/messagesSlice';

const OutputMessages = () => {
  const lastMessageRef = useRef();
  const currentMessages = useSelector(filteredMessages);

  return (
    <>
      {currentMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          :
          {' '}
          {filter.clean(message.body)}
        </div>
      ))}
      <span ref={lastMessageRef} />
    </>
  );
};

export default OutputMessages;
