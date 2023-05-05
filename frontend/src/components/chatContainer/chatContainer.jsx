import { useContext } from 'react';
import { useSelector } from 'react-redux';
import InputMessage from './inputMessage';
import OutputMessages from './outputMessage';
import ChatContext from '../../contexts/chat';
import { selectors } from '../../slices/messagesSlice';

const ChatContainer = () => {
  const chatContext = useContext(ChatContext);
  const { currentChannel } = chatContext;
  const messages = useSelector(selectors.selectAll);

  const filteredMessages = messages.filter((message) => message.channelId === currentChannel.id);
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${currentChannel.name}`}
          </b>
        </p>
        <span className="text-muted">
          {`${filteredMessages.length} сообщений` }
        </span>
      </div>
      <div className="flex-grow-1 overflow-auto px-5 ">
        <OutputMessages />
      </div>
      <div className="mt-auto px-5 py-3">
        <InputMessage />
      </div>
    </div>
  );
};

export default ChatContainer;
