// @ts-check

import axios from 'axios';
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import ModalWindow from './ModalWindow.jsx';
import { initChannels } from '../slices/channelsSlice.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();
  const history = useHistory();
  const notify = () => toast.error(t('networkError'));

  const fetchData = async () => {
    const token = auth.getToken();

    try {
      const response = await axios.get(routes.data(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;
      dispatch(initChannels({ data }));
    } catch (error) {
      history.replace('/login');
      notify();

      if (!error.isAxiosError || error.response.status !== 401) {
        throw new Error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">
          <Channels />
          <Messages />
        </Row>
      </Container>
      <ModalWindow />
    </>
  );
};

export default HomePage;
