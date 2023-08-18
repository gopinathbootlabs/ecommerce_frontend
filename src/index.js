import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<GoogleOAuthProvider clientId="8704354269-vp21uc1t33583f82ctk6maj14b67jj6u.apps.googleusercontent.com">
  <React.StrictMode>
      <App/>

  </React.StrictMode>
</GoogleOAuthProvider>
);

reportWebVitals();
