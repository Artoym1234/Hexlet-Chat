import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const getModal = (modalName) => {
  const modals = {
    adding: Add,
    removing: Remove,
    renaming: Rename,
  };
  return modals[modalName];
};

export default getModal;
