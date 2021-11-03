// @ts-check

import axios from 'axios';
import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { initChannels } from '../slices/channelsSlice.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const history = useHistory();
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
      if (!error.isAxiosError || error.response.status !== 401) {
        throw new Error(error);
      }
      history.replace('/login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
          <Channels />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
