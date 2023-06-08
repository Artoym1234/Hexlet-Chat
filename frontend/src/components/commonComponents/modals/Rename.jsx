import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { selectors } from '../../../slices/channelsSlice';
import getValidationSchema from '../validate';
import { useChatApi } from '../../contexts/SocketProvider.jsx';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { selectorsModal } from '../../../slices/modalSlice';

const Rename = ({ handleClose }) => {
  const { t } = useTranslation();
  const chatApi = useChatApi();
  const { notify } = useAuth();
  const inputRef = useRef();

  const channels = useSelector(selectors.selectAll);
  const channelsName = channels.map((el) => el.name);
  const schema = getValidationSchema('schemaChannelName')(channelsName);

  const { channelId, channelName } = useSelector(selectorsModal.getModalContext);

  const formik = useFormik({
    initialValues: {
      nameChannel: channelName.name,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await chatApi.renameChannel(channelId, values.nameChannel);
        notify('success', t('feedback.channel_rename'));
        handleClose();
      } catch (error) {
        notify('error', t('feedback.error_network'));
        formik.setSubmitting(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.modal.rename_title')}</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>

        <Modal.Body>
          <Form.Group>
            <Form.Control
              id="nameChannel"
              onChange={formik.handleChange}
              value={formik.values.nameChannel}
              isInvalid={formik.errors.nameChannel}
              className="mb-2"
              name="nameChannel"
              ref={inputRef}
              disabled={formik.isSubmitting}
            />
            <Form.Label htmlFor="nameChannel" className="visually-hidden">
              {t('channels.name')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.nameChannel}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{t('channels.modal.cancel_button')}</Button>
          <Button type="submit" value="submit">{t('channels.rename')}</Button>
        </Modal.Footer>

      </form>
    </>
  );
};

export default Rename;
