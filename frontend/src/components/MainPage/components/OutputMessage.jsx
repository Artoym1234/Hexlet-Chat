import { useRef } from 'react';
import { useSelector } from 'react-redux';
// import LeoProfanity from 'leo-profanity';
import { filteredMessages } from '../../../slices/messagesSlice';

const OutputMessages = () => {
  const lastMessageRef = useRef();
  const currentMessages = useSelector(filteredMessages);

  /* const filterWords = LeoProfanity;
  const ruWords = filterWords.getDictionary('ru');
  filterWords.add(ruWords); */

  return (
    <>
      {currentMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          :
          {' '}
          {message.body}
        </div>
      ))}
      <span ref={lastMessageRef} />
    </>
  );
};

export default OutputMessages;
