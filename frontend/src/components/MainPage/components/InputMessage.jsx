import {
  Form, InputGroup,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import React, {
  useRef, useEffect, useContext,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ChatContext from '../../contexts/chat';
import AuthContext from '../../contexts/index';

const InputMessage = () => {
  const { t } = useTranslation();
  // const [text] = useState('');
  const chatContext = useContext(ChatContext);
  const { chatApi } = chatContext;
  const authContext = useContext(AuthContext);
  const { notify } = authContext;

  const activeChannelId = useSelector((state) => {
    const { currentChannelId } = state.channels;
    return currentChannelId;
  });
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, [activeChannelId]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string('').trim().required(),
    }),

    onSubmit: async (values) => {
      const message = {
        body: values.body,
        channelId: activeChannelId,
        username: localStorage.username,
      };
      try {
        await chatApi.sendNewMessage(message);
        // eslint-disable-next-line no-param-reassign
        values.body = '';
      } catch {
        notify('error', t('feedback.error_network'));
      }
    },
  });

  return (
    <Form
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <InputGroup>
        <Form.Control
          name="body"
          id="body"
          // type="text"
          placeholder={t('placeholder.input_message')}
          value={formik.values.body}
          onChange={formik.handleChange}
          aria-label="Новое сообщение"
          className="border-0 p-0 ps-2"
          ref={ref}
        />
        <Button variant="light" type="submit">
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
