import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from './router/Routes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { StrictMode } from 'react';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      richColors
      // position="top-center"
      toastOptions={{
        style: {
          // background: "#2ecc71",
          border: 'none',
        },
      }}
    />
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
