import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Import global style file
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import App from './App';
import reportWebVitals from './reportWebVitals';

// Use the new root API for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The line below is optional and used for measuring performance
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
