import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../slices/channelsSlice';
import getValidationSchema from '../../validate';
import ChatContext from '../../contexts/chat';
import AuthContext from '../../contexts/index';

const Rename = (props) => {
  const { t } = useTranslation();
  const { onHide, channel } = props;
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { renameChannel } = chatContext;
  const { notify } = authContext;
  const inputRef = useRef();

  const channels = useSelector(selectors.selectAll);
  const channelsName = channels.map((el) => el.name);
  const schema = getValidationSchema('schemaChannelName')(channelsName);

  const formik = useFormik({
    initialValues: {
      nameChannel: channel.name,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      try {
        renameChannel(channel.id, values.nameChannel);
        onHide();
        notify('success', t('feedback.channel_rename'));
      } catch {
        notify('error', t('feedback.error'));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channels.modal.rename_title')}</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              id="name"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nameChannel}
              isInvalid={formik.errors.nameChannel}
              data-testid="nameChannel"
              name="nameChannel"
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.nameChannel}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>{t('channels.modal.cancel_button')}</Button>
          <Button type="submit" value="submit">{t('channels.rename')}</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default Rename;
