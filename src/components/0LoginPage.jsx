import React from 'react';
import { Formik } from 'formik';
import { Form, Button, Alert } from 'react-bootstrap';
import validationSchemas from '../validation.js';

export default () => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchemas.LoginFormSchema}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        isSubmitting,
        status,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="validationUsername">
            <Form.Label>t(loginForm.username)</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.username && touched.username}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationPassword">
            <Form.Label>t(loginForm.password)</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.username && touched.username}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            {status && <Alert variant="danger">t(status.key)</Alert>}
          </Form.Group>
          <Form.Group>
            <Button type="submit" disabled={isSubmitting}>t(loginForm.submit)</Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  </div>
);
