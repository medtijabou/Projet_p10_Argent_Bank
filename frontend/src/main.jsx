import React from 'react';
import ReactDOM from 'react-dom/client';  // Une seule importation
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/sotre';  // Assure-toi que le chemin est correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
