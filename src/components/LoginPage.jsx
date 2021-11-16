// @ts-check

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Card, Form, Container, Row, Col,
} from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import validationSchemas from '../validation.js';

const LoginForm = () => {
  const auth = useAuth();
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const inputRef = useRef();
  const history = useHistory();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchemas.LoginFormSchema,
    onSubmit: async (loginData) => {
      try {
        const response = await axios.post(routes.loginPath(), loginData);
        const { token, username } = response.data;
        auth.logIn(token, username);
        history.replace('/');
      } catch (error) {
        if (!error.isAxiosError || error.response.status !== 401) {
          throw new Error(error);
        }
        setIsAuthFailed(true);
        inputRef.current.select();
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Ваш ник"
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={isAuthFailed
            || (formik.touched.username && !!formik.errors.username)}
          required
          ref={inputRef}
          className="form-control"
          disabled={formik.isSubmitting}
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
        {formik.touched.username && formik.errors.username ? (
          <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
        ) : null}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="password"
          name="password"
          id="password"
          autoComplete="current-password"
          isInvalid={isAuthFailed
            || (formik.touched.password && !!formik.errors.password)}
          required
          className="form-control"
          disabled={formik.isSubmitting}
        />
        <Form.Label htmlFor="password">Password</Form.Label>
        {formik.touched.password && formik.errors.password ? (
          <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
        ) : null}
        <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={formik.isSubmitting}>Submit</Button>
    </Form>
  );
};

const LoginPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col sm={8} md={6} xxl={4}>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <LoginForm />
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="d-flex justify-content-center gap-1">
              <span>Нет аккаунта?</span>
              <Link to="/signup">Регистрация</Link>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
