import { createRoot } from 'react-dom/client';
import { Images, ImageList } from './pages';

const root = createRoot(document.getElementById('app'));
root.render(
  <ImageList />
);