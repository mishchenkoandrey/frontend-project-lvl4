// @ts-check

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import routes from '../common/routes.js';
import validationSchemas from '../validation.js';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
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
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3 d-flex flex-column gap-3">
            <Form.Group>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="username"
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={authFailed || (formik.touched.username && !!formik.errors.username)}
                required
                ref={inputRef}
              />
              {formik.touched.username && formik.errors.username ? (
                <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="password"
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={authFailed || (formik.touched.password && !!formik.errors.password)}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
              ) : null}
              <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-primary">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
