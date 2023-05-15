import {
  Button,
} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ChannelItem = (props) => {
  const { t } = useTranslation();
  const {
    channel,
    currentChannel,
    setCurrentChannel,
    showModal,
  } = props;

  return (
    <li className="nav-item w-100" key={channel.id}>
      { !channel.removable
        ? (
          <button
            type="button"
            onClick={() => setCurrentChannel(channel)}
            className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
              'btn-secondary': channel.id === currentChannel.id,
            })}
          >
            <span>#</span>
            {' '}
            {channel.name}
          </button>
        )
        : (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              type="button"
              variant={channel.id === currentChannel.id && 'secondary'}
              onClick={() => setCurrentChannel(channel)}
              className="w-100 rounded-0 text-start text-truncate"
            >
              <span className="me-1">#</span>
              {' '}
              {channel.name}
            </Button>
            <Dropdown.Toggle
              split
              variant={channel.id === currentChannel.id && 'secondary'}
              id={`dropdown-split-basic-${channel.id}`}
            >
              <span className="visually-hidden">
                {t('channels.control')}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                href="#"
                onClick={() => showModal('removing', channel)}
              >
                {t('channels.remove')}
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => showModal('renaming', channel)}
              >
                {t('channels.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
    </li>
  );
};
export default ChannelItem;