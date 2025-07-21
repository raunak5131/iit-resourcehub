import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

// 🆕 Import the BookmarkProvider
import { BookmarkProvider } from './context/BookmarkContext';
import { UserProvider } from "./context/UserContext";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BookmarkProvider>
      <UserProvider>
      <App />
      </UserProvider>
    </BookmarkProvider>
  </React.StrictMode>
);

reportWebVitals();
