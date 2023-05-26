import {
  Form, InputGroup,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import { useTranslation } from 'react-i18next';
import ChatContext from '../../contexts/chat';
import AuthContext from '../../contexts/index';

const InputMessage = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const chatContext = useContext(ChatContext);
  const { chatApi } = chatContext;
  const authContext = useContext(AuthContext);
  const { notify } = authContext;

  const activeChannelId = useSelector((state) => {
    const { currentChannelId } = state.channels;
    return currentChannelId;
  });

  const sendMessage = async () => {
    const message = {
      body: text,
      channelId: activeChannelId,
      username: localStorage.username,
    };
    try {
      await chatApi.sendNewMessage(message);
      setText('');
    } catch {
      notify('error', t('feedback.error_network'));
    }
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
          placeholder={t('placeholder.input_message')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Новое сообщение"
          className="border-0 p-0 ps-2"
          ref={ref}
        />
        <Button variant="light" type="submit" disabled={text === ''}>
          <ArrowRightSquare width="20" height="20" />
          <span className="visually-hidden">
            {t('chat_container.send')}
          </span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default InputMessage;
