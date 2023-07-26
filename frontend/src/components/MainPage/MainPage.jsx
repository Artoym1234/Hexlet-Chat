import React, {
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ChannelsContainer from './components/ChannelsContainer.jsx';
import ChatContainer from './components/ChatContainer.jsx';
import { selectors as loadingStateSelectors, stateLoad } from '../../slices/loadingSlice.js';
import { useAuth } from '../contexts/AuthProvider.jsx';
import fetchInitialData from '../../slices/fetchInitialData.js';
import GetModal from '../commonComponents/modals/index.js';

const handleUpdate = (navigate) => () => {
  navigate(0);
};
const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div role="status" className="spinner-border text-primary">
        <span className="visually-hidden">{t('feedback.loading')}</span>
      </div>
    </div>
  );
};

const SomethingWrong = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <p className="p-2 fst-italic">{t('errors.somethingWrong')}</p>
      <Button className="p-2" onClick={handleUpdate(navigate)}>{t('errors.update')}</Button>
    </div>
  );
};

const MainContent = () => (
  <div className="container rounded my-4 h-100 overflow-hidden shadow flex-grow-1">
    <div className="row d-flex flex-row bg-white h-100">
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <ChannelsContainer />
      </div>
      <div className="col h-100 p-0">
        <ChatContainer />
      </div>
    </div>
  </div>

);

const ChatContent = () => {
  const loadingState = useSelector(loadingStateSelectors.getStatus);
  switch (loadingState) {
    case stateLoad.success:
      return <MainContent />;
    case stateLoad.fail:
      return <SomethingWrong />;
    default:
      return <Loading />;
  }
};

const MainPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { logOut, getAuthHeader, notify } = useAuth();

  const loadingState = useSelector(loadingStateSelectors.getStatus);

  useEffect(() => {
    dispatch(fetchInitialData(getAuthHeader()));
  }, [dispatch, getAuthHeader]);

  switch (loadingState) {
    case stateLoad.authError:
      notify('error', t('feedback.unauthorized'));
      logOut();
      break;
    case stateLoad.networkError:
      notify('error', t('feedback.error_network'));
      break;
    default:
      break;
  }

  return (
    <>
      <ChatContent />
      <GetModal />
    </>
  );
};

export default MainPage;
