// @ts-check

import { useFormik } from 'formik';
import React, { useRef, useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  Container, Row, Col, Form, Button,
} from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Header from './Header.jsx';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';

const SignupForm = () => {
  const history = useHistory();
  const [isValidData, setIsValidData] = useState(true);
  const inputRef = useRef();
  const auth = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required().min(3).max(20),
      password: yup.string().required().min(6, 'minChars'),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null]),
    }),
    onSubmit: async ({ username, password }) => {
      const credentials = { username, password };
      try {
        const response = await axios.post(routes.signupPath(), credentials);
        const { token } = response.data;
        auth.logIn(token, username);
        history.replace('/');
      } catch (error) {
        if (!error.isAxiosError || error.response.status !== 409) {
          throw new Error(error);
        }
        inputRef.current.select();
        setIsValidData(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="p-3">
      <Form.Group>
        <Form.Label htmlFor="username">username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          id="username"
          value={formik.values.username}
          ref={inputRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="minMaxChars"
          autoComplete="username"
          isInvalid={
            (formik.errors.username && formik.touched.username) || !isValidData
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="minChars"
          autoComplete="new-password"
          isInvalid={
            (formik.errors.password && formik.touched.password) || !isValidData
          }
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="confirmPassword">
          confirmPassword
        </Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="passwordsMustMatch"
          autoComplete="new-password"
          isInvalid={
            (formik.errors.confirmPassword && formik.touched.confirmPassword)
            || !isValidData
          }
        />
        <Form.Control.Feedback type="invalid">
          {!isValidData
            ? 'userAlreadyExists'
            : formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100" disabled={formik.isSubmitting || !formik.isValid}>
        signup
      </Button>
    </Form>
  );
};

const SignupPage = () => (
  <>
    <Container fluid>
      <Row className="justify-content-center pt-5">
        <Col sm={4}>
          <SignupForm />
        </Col>
      </Row>
    </Container>
  </>
);

export default SignupPage;
