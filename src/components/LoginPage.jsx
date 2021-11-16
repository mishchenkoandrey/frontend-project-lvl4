// @ts-check

import React from 'react';
import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm.jsx';

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
