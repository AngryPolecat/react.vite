import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import { Layout } from './components/layout/layout'
import { HomePage } from './pages/home/home'
import { LoginPage } from './pages/login/login'
import { NotFoundPage } from './pages/notFound/notFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export const App = () => {
  const currentToken = useSelector((state) => state.currentUser.token)

  return <RouterProvider router={router} />
}
