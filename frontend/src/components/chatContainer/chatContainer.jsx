import { useContext } from 'react';
import InputMessage from './inputMessage';
import OutputMessages from './outputMessage';
import ChatContext from '../../contexts/chat';

const ChatContainer = ({ socket }) => {
  const chatContext = useContext(ChatContext);
  const { currentChannelId } = chatContext;

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {currentChannelId}
          </b>
        </p>
        <span className="text-muted">
          {}
        </span>
      </div>
      <div className="flex-grow-1 overflow-auto px-5 ">
        <OutputMessages />
      </div>
      <div className="mt-auto px-5 py-3">
        <InputMessage socket={socket} />
      </div>
    </div>
  );
};

export default ChatContainer;
