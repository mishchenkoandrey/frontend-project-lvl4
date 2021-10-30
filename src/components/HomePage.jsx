// @ts-check

import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';

const HomePage = () => {
  const auth = useAuth();
  console.log('HomePage:', auth);
  const history = useHistory();
  const fetchData = async () => {
    const token = auth.getToken();
    try {
      await axios.get(routes.data(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  return <p>boom</p>;
};

export default HomePage;
