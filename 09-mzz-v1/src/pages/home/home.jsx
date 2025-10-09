import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const currentToken = useSelector((state) => state.currentUser.token)
  const navigate = useNavigate()

  useEffect(() => {
    !currentToken && navigate('/login')
  }, [])

  return <div>Home Page</div>
}
