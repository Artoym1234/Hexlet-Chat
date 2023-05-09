import React, { useContext, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/channelsSlice';
import ChatContext from '../../contexts/chat';
import AuthContext from '../../contexts/index';
import getValidationSchema from '../../validate';

const Add = (props) => {
  const inputRef = useRef();
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { sendNewChannel } = chatContext;
  const { notify } = authContext;
  const { onHide } = props;
  const channels = useSelector(selectors.selectAll);
  const channelsName = channels.map((channel) => channel.name);
  const schema = getValidationSchema('schemaChannelName')(channelsName);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      nameChannel: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      try {
        sendNewChannel(values.nameChannel);
        onHide();
        notify('success', 'Канал создан');
      } catch {
        notify('error', 'Ошибка');
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              id="name"
              required
              autoComplete="false"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameChannel}
              isInvalid={formik.errors.nameChannel}
              name="nameChannel"
              disabled={formik.isSubmitting}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.nameChannel}</Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Отменить</Button>
            <Button type="submit" disabled={formik.isSubmitting}>Добавить</Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
