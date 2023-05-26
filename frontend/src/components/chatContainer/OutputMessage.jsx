import { useSelector } from 'react-redux';
import { useRef } from 'react';
import LeoProfanity from 'leo-profanity';
import { selectors } from '../../slices/messagesSlice';
// import ChatContext from '../../contexts/chat';

const OutputMessages = () => {
  const activeChannelId = useSelector((state) => {
    const { currentChannelId } = state.channels;
    return currentChannelId;
  });
  const messages = useSelector(selectors.selectAll);
  // const chatContext = useContext(ChatContext);
  // const { currentChannel } = chatContext;
  const lastMessageRef = useRef();
  const filteredMessages = messages.filter((message) => message.channelId === activeChannelId);

  const filterWords = LeoProfanity;
  const ruWords = filterWords.getDictionary('ru');
  filterWords.add(ruWords);

  return (
    <>
      {filteredMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          :
          {filterWords.clean(message.body)}
        </div>
      ))}
      <span ref={lastMessageRef} />
    </>
  );
};

export default OutputMessages;
