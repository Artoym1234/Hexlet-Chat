import {
  Button,
} from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import { PlusSquare } from 'react-bootstrap-icons';
import { selectors } from '../slices/channelsSlice';

const ChannelsContainer = () => {
  const channels = useSelector(selectors.selectAll);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <b>Каналы</b>
        <Button
          variant="light"
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare height="20" width="20" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 flex-nowrap">
        {channels.map((el) => (
          <li className="nav-item w-100" key={el.id}>
            <button type="button" className="border-0 w-100 rounded-0 text-start text-truncate btn">
              <span className="me-1">#</span>
              {el.name}
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ChannelsContainer;
