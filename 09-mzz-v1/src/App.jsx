import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './components/layout/layout'
import { HomePage } from './pages/home/home'
import { LoginPage } from './pages/login/login'
import { NotFoundPage } from './pages/notFound/notFound'
import { ModelsPage } from './pages/models/models'
import { ModelPage } from './pages/model/model'
import { LpuPage } from './pages/lpu/lpu'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'models', element: <ModelsPage /> },
      { path: 'model/:modelId/lpu', element: <ModelPage /> },
      { path: 'model/:modelId/lpu/:mcod', element: <LpuPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}
