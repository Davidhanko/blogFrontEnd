import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './sites/App.jsx'
import './index.css'
import {createBrowserRouter, Route, RouterProvider} from "react-router-dom";
import Register from "./sites/Register.jsx";
import Login from "./sites/Login.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: 'register',
        element: <Register/>
    },
    {
        path: 'login',
        element: <Login/>
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
