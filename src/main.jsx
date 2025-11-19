import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// TinaCMS Integration
const TinaProvider = async () => {
  // Only load TinaCMS in development or when client ID is available
  if (import.meta.env.DEV || import.meta.env.VITE_TINA_CLIENT_ID) {
    try {
      const { TinaProvider } = await import('tinacms/dist/rich-text');
      const { client } = await import('../tina/__generated__/client');
      
      return ({ children }) => (
        <TinaProvider client={client}>
          {children}
        </TinaProvider>
      );
    } catch (error) {
      console.warn('TinaCMS not available, running without visual editing:', error);
      return ({ children }) => children;
    }
  }
  
  // Return passthrough component for production without TinaCMS
  return ({ children }) => children;
};

// Initialize and render app
(async () => {
  const Provider = await TinaProvider();
  
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>,
  );
})();
