import { Col } from 'react-bootstrap';
import InputMessage from './inputMessage';
import OutputMessages from './outputMessage';

const ChatContainer = () => (
  <Col className="p-0 h-100">
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            Название чата
          </b>
        </p>
        <span className="text-muted">
          {}
        </span>
      </div>
      <div id="messages-box" className="chat-messages flex-grow-1 overflow-auto px-5 ">
        <OutputMessages />
      </div>
      <div className="mt-auto px-5 py-3">
        <InputMessage />
      </div>
    </div>
  </Col>
);

export default ChatContainer;
