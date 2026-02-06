import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

import { initSentry } from './lib/sentry';
import { initGA } from './components/Analytics';

// Initialize monitoring earlier in the lifecycle
initSentry();
initGA();

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);