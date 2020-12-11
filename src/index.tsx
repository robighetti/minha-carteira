import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from './hooks/theme';
import { AuthProvider } from './hooks/auth';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
