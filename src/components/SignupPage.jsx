// @ts-check

import { useFormik } from 'formik';
import React, { useRef, useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  Container, Row, Col, Form, Button, Card, FloatingLabel,
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
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form.Group>
        <FloatingLabel
          controlId="floatingInput"
          label="Username"
          className="mb-3"
        >
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
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId="floatingInput"
          label="Password"
          className="mb-3"
        >
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
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel
          controlId="floatingInput"
          label="Confirm Password"
          className="mb-4"
        >
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
        </FloatingLabel>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100" disabled={formik.isSubmitting || !formik.isValid}>
        signup
      </Button>
    </Form>
  );
};

const SignupPage = () => (
  <>
    <Container fluid className="h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col sm={4}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <SignupForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default SignupPage;
