import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
  return <RouterProvider router={router} />
}
