// Componentes  Base:
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Componentes do ROUTER
import{createBrowserRouter, RouterProvider, Router} from "react-router-dom"
// Componentes:
import Home from './components/Home.jsx'
import DevForm from './components/DevForm.jsx'
import DevInformation from './components/DevInformation.jsx'
import HookUseContext from './context/Context.jsx'
import DevEdit from './components/DevEdit.jsx'

const router = createBrowserRouter([
  // Elemento Principal:
  {
    element: <App/>,
    path: "/",
    children: [
      {
        path:"/",
        element: <Home/>
      },
      {
        path: "/form",
        element:<DevForm/>
      },
      {
        path:"/developer/:id",
        element: <DevInformation/>
      },
      {
        path:"/developer/:id/edit",
        element:<DevEdit/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HookUseContext>
   <RouterProvider router={router}/>
   </HookUseContext>
  </StrictMode>,
)
