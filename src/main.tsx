import { createRoot } from 'react-dom/client';
import Markdown from './markdown.tsx';

const App = () => {
  return <Markdown />;
};

createRoot(document.getElementById('app') as HTMLElement).render(App());
