import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./CSS/style.css";
// import "./CSS/responsive.css";
import { AuthProvider } from "./Contexts/Authcontext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);