import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useChatApi } from '../../contexts/SocketProvider.jsx';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { selectorsModal } from '../../../slices/modalSlice';

const Remove = ({ handleClose }) => {
  const { t } = useTranslation();
  const chatApi = useChatApi();
  const { notify } = useAuth();

  const { channelId } = useSelector(selectorsModal.getModalContext);

  const remove = async () => {
    try {
      await chatApi.removeChannel(channelId);
      handleClose();
      notify('success', t('feedback.channel_remove'));
    } catch {
      notify('error', t('feedback.error_network'));
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.modal.remove_title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('channels.modal.confirm')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>{t('channels.modal.cancel_button')}</Button>
        <Button variant="danger" onClick={remove}>{t('channels.remove')}</Button>
      </Modal.Footer>
    </>
  );
};

export default Remove;
