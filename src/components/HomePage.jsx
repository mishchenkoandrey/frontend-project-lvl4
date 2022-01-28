// @ts-check

import axios from 'axios';
import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const notify = (error) => toast.error(t(error));

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
      if (error.isAxiosError && error.response.status === 401) {
        auth.logOut();
        return;
      }
      if (error.isAxiosError && error.response.status === 500) {
        notify('networkError');
        console.error(error.response.statusText);
      }
      notify('unknownError');
      console.error(error.response.statusText);
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
