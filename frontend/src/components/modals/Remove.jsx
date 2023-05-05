import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ChatContext from '../../contexts/chat';
import AuthContext from '../../contexts/index';

const Remove = (props) => {
  const { onHide, channel } = props;
  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { removeChannel } = chatContext;
  const { notify } = authContext;

  const remove = (id) => {
    try {
      removeChannel(id);
      onHide();
      notify('success', 'Канал удален');
    } catch {
      notify('error', 'Ошибка');
    }
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Отменить</Button>
        <Button variant="danger" onClick={() => remove(channel.id)}>Удалить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
