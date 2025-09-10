import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home, About, Cart, Category, ProductDetails, NotFound, Thanks } from './pages'
import { productsLoader, categoriesLoader } from './loaders'
import { ErrorBoundary } from './components/ErrorBoundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home />, loader: categoriesLoader, errorElement: <ErrorBoundary /> },
      { path: 'old-home', element: <Navigate to={'/'} /> },
      { path: 'about', element: <About /> },
      { path: 'cart', element: <Cart /> },
      { path: 'thanks', element: <Thanks /> },
      { path: 'category/:categoryId', element: <Category />, loader: productsLoader, errorElement: <ErrorBoundary /> },
      { path: 'product/:productId', element: <ProductDetails /> },
      { path: '*', element: <NotFound /> },
      // { path: "*", element: <Navigate to="/" /> },
    ],
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}

//Rus
/*
  1.	Запустите JSON-сервер (инструкции указаны в видео и в файле links).
  2.	Создайте две отдельные функции fetch для запроса данных категорий и продуктов.
  3.	Удалите старую логику использования данных категорий и продуктов в магазине, заменив её на получение данных с помощью loader в параметрах маршрутизатора.
  4.	Создайте универсальный обработчик ошибок с помощью errorElement.
  5.	Получите данные с категориями и продуктами от API, используя хук useLoaderData(), и примените их на страницах Home и Category.
  6.	С помощью state передайте массив продуктов на страницу ProductDetails. Получите данные с помощью хука useLocation() и используйте их для фильтрации конкретного продукта по параметру URL.
*/
