import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root') as HTMLElement;

if (container) {
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
