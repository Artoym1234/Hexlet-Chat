import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { selectors } from '../../slices/channelsSlice';
import getValidationSchema from '../../validate';
import ChatContext from '../../contexts/chat';
import AuthContext from '../../contexts/index';

const Rename = (props) => {
  const { t } = useTranslation();
  const { onHide, channel } = props;
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { chatApi } = chatContext;
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
    onSubmit: async (values) => {
      try {
        await chatApi.renameChannel(channel.id, values.nameChannel);
        notify('success', t('feedback.channel_rename'));
        onHide();
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
  }, [formik.touched.name]);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channels.modal.rename_title')}</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <fieldset disabled={formik.isSubmitting}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                // id="name"
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
              <FloatingLabel
                cdhtmlFor="name"
                controlId="name"
                label={t('channels.name')}
                className="visually-hidden"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>{t('channels.modal.cancel_button')}</Button>
            <Button type="submit" value="submit">{t('channels.rename')}</Button>
          </Modal.Footer>
        </fieldset>
      </form>
    </Modal>
  );
};

export default Rename;
