import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { HelmetProvider } from 'react-helmet-async';
import ThemeInitializer from './core/ThemeInitializer.jsx';
import './styles/themes.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <HelmetProvider>
          <ThemeInitializer />
          <App />
        </HelmetProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
