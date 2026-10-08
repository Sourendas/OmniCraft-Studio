import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import App from './App.tsx';
import './index.css';

// Render synchronously, then drop the prerendered #boot block in the same task.
// The browser never paints both, so the app does not jump up when boot goes.
const root = createRoot(document.getElementById('root')!);
flushSync(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
document.getElementById('boot')?.remove();
