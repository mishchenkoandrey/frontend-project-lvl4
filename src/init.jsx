import React from 'react';

import App from './components/App.jsx';
import ProvideAuth from './components/ProvideAuth.jsx';

export default async () => (
  <ProvideAuth>
    <App />
  </ProvideAuth>
);
