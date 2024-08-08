import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, createBrowserRouter , RouterProvider, createRoutesFromElements } from 'react-router-dom'

import App from './App.tsx'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route></Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)
