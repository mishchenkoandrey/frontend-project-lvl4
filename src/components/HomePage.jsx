// @ts-check

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
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
  const [isLoading, setLoading] = useState(true);
  const isMountedRef = useRef(null);

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
      setLoading(false);
    } catch (error) {
      if (error.isAxiosError && error.response.status === 401) {
        auth.logOut();
        return;
      }

      if (error.isAxiosError && error.response.status === 500) {
        toast(t('networkError'));
        console.error(error.response.statusText);
      }

      toast(t('unknownError'));
      console.error(error.response.statusText);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;

    if (isMountedRef.current) {
      fetchData();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchData]);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="justify-content-center align-content-center h-100 bg-white">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">{t('loading')}</span>
            </Spinner>
          ) : (
            <>
              <Channels />
              <Messages />
            </>
          )}
        </Row>
      </Container>
      <ModalWindow />
    </>
  );
};

export default HomePage;
