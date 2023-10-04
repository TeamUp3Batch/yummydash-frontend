import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import store from './store/store'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
  <App />
</BrowserRouter>
</Provider>
</React.StrictMode>,
);

