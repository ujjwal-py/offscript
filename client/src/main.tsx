import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './components/ui/provider.tsx'
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>
)
