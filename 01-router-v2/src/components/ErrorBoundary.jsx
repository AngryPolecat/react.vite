import { useRouteError } from 'react-router-dom'

export const ErrorBoundary = () => {
  const error = useRouteError()

  return <div className="text-red-600 text-center m-5">{error.message}</div>
}
