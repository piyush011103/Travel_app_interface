import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { CategoryProvider } from './Context/category-context';
import { DateProvider } from './Context/date-context';
import { AuthProvider } from './Context/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DateProvider>
      <Router>
        <CategoryProvider>
          
            <AuthProvider>
              <App />
            </AuthProvider>
          
        </CategoryProvider>
      </Router>
    </DateProvider>
);

reportWebVitals();