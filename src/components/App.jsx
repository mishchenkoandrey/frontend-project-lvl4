import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import HomePage from './HomePage.jsx';
import LoginPage from './LoginPage.jsx';
import PageNotFound from './PageNotFound.jsx';
import Header from './Header.jsx';

export default () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <HomePage />
        </Route>
        <Route path="/login">
          <Header />
          <LoginPage />
        </Route>
        <Route>
          <Header />
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  </div>
);
