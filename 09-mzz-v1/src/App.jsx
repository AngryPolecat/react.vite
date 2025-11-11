import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './components/layout/layout'
import { HomePage } from './pages/home/home'
import { LoginPage } from './pages/login/login'
import { NotFoundPage } from './pages/notFound/notFound'
import { ModelsPage } from './pages/models/models'
import { ModelPage } from './pages/model/model'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'models', element: <ModelsPage /> },
      { path: 'model/:id', element: <ModelPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}
