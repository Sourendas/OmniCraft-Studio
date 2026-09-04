import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const dropBoot = () => document.getElementById('boot')?.remove();
if (typeof requestAnimationFrame === 'function') {
  requestAnimationFrame(() => requestAnimationFrame(dropBoot));
} else {
  setTimeout(dropBoot, 0);
}
