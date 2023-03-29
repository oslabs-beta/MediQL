import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';

const container = document.getElementById('root') as HTMLElement;

if (container) {
  const root = createRoot(container);

  //getElementById(elementId: string): HTMLElement | null;

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
