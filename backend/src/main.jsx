// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// React.StrictMode helps highlight potential issues during development
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* BrowserRouter enables client-side routing */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
