import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useChatApi } from '../../contexts/SocketProvider.jsx';
import { useAuth } from '../../contexts/AuthProvider.jsx';

const Remove = (props) => {
  const { t } = useTranslation();
  const { onHide, channel } = props;
  const { chatApi } = useChatApi();
  const { notify } = useAuth();

  const remove = async (id) => {
    try {
      await chatApi.removeChannel(id);
      onHide();
      notify('success', t('feedback.channel_remove'));
    } catch {
      notify('error', t('feedback.error_network'));
    }
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('channels.modal.remove_title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('channels.modal.confirm')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>{t('channels.modal.cancel_button')}</Button>
        <Button variant="danger" onClick={() => remove(channel.id)}>{t('channels.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
