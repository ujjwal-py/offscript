import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './components/ui/provider.tsx'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/AuthProvider.tsx'
import { Theme } from '@chakra-ui/react'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <Provider>
          <Theme appearance="dark">
            <App />

          </Theme>

        </Provider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
