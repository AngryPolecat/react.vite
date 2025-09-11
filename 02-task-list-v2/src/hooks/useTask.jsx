import { createContext, useContext } from 'react'

export const Context = createContext()

export const useTask = () => {
  const context = useContext(Context)
  return context
}
