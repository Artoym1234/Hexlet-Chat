import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import filter from 'leo-profanity';
import { selectChannelNames, actions as channelsActions } from '../../../slices/channelsSlice';
import { useChatApi } from '../../contexts/SocketProvider.jsx';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import getValidationSchema from '../validate';

const Add = ({ handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const chatApi = useChatApi();
  const { notify } = useAuth();
  const channelsName = useSelector(selectChannelNames);
  const schema = getValidationSchema('schemaChannelName')(channelsName);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      nameChannel: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const data = await chatApi.sendNewChannel(filter.clean(values.nameChannel));
        console.log(data);
        dispatch(channelsActions.setCurrentChannelId(data.id));
        handleClose();
        notify('success', t('feedback.channel_add'));
      } catch {
        notify('error', t('feedback.error_network'));
        formik.setSubmitting(false);
      }
    },

    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.modal.add_title')}</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <fieldset disabled={formik.isSubmitting}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
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
              <Form.Control.Feedback type="invalid">{t(formik.errors.nameChannel)}</Form.Control.Feedback>
              <FloatingLabel
                controlId="name"
                label={t('channels.name')}
                className="visually-hidden"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>{t('channels.modal.cancel_button')}</Button>
            <Button type="submit" disabled={formik.isSubmitting}>{t('channels.modal.send_button')}</Button>
          </Modal.Footer>
        </fieldset>
      </form>
    </>
  );
};

export default Add;
