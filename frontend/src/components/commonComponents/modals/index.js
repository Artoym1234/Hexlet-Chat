import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';
import { selectorsModal, actions } from '../../../slices/modalSlice.js';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const GetModal = () => {
  const dispatch = useDispatch();

  const modalType = useSelector(selectorsModal.getModalType);
  const isOpen = useSelector(selectorsModal.isModalOpen);

  const handleClose = () => dispatch(actions.close());

  const CurrentModal = modals[modalType];

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      {CurrentModal && <CurrentModal handleClose={handleClose} />}
    </Modal>
  );
};

export default GetModal;
