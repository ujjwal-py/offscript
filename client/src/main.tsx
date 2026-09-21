import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './components/ui/provider.tsx'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/AuthProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <Provider>
          <App />
        </Provider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
