import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { reduxStorage } from './store'; // when you export something from the index file, you don't have to write forward slash index here


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <Provider store={reduxStorage}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


// user ADMIN --> userId: 26c2a46a-5fa6-43c1-8765-f96cc07d85bb