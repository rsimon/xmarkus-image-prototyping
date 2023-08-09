import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DatabaseProvider } from './db/DatabaseProvider';
import { App } from './App';

import './index.css';

const root = createRoot(document.getElementById('app'));
root.render(
  <DatabaseProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DatabaseProvider>
);