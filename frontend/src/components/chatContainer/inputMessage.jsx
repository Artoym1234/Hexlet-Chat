import {
  Form, InputGroup,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import ChatContext from '../../contexts/chat';

const InputMessage = () => {
  const [text, setText] = useState('');
  const chatContext = useContext(ChatContext);
  const { sendNewMessage, currentChannelId } = chatContext;

  const sendMessage = () => {
    const message = {
      body: text,
      channelId: currentChannelId,
      username: localStorage.username,
    };
    sendNewMessage(message);
    setText('');
  };

  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  });

  return (
    <Form
      className="py-1 border rounded-2"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Введите сообщение..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Новое сообщение"
          className="border-0 p-0 ps-2"
          ref={ref}
        />
        <Button variant="light" type="submit" disabled={text === ''}>
          <ArrowRightSquare width="20" height="20" />
          <span className="visually-hidden">
            Отправить
          </span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default InputMessage;
