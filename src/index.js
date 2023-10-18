import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <Provider store={store}>
  <PersistGate persistor={persistor} loading={null}>
  <BrowserRouter>
  <App />
</BrowserRouter>
  </PersistGate>
</Provider>
</React.StrictMode>,
);

