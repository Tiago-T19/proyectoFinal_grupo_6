import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { routes } from './routes/routes'
import { ProveedorContext } from './contexts/AutorizacionesContext'
import { ProveedorPartidasContext } from './contexts/PartidasContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProveedorContext>
      <ProveedorPartidasContext>
        <RouterProvider router={routes} />
      </ProveedorPartidasContext>
    </ProveedorContext>
  </StrictMode>,
)