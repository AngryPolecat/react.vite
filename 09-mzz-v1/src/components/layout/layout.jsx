import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Header } from '../header/header'
import { Footer } from '../footer/footer'
import styles from './layout.module.css'
import { Loader } from '../../UI/loader/loader'
import { Message } from '../../UI/message/message'

export const Layout = () => {
  const loader = useSelector((state) => state.options.loader)
  const message = useSelector((state) => state.options.message)

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={styles.main}>
            <Outlet />
          </div>
          {message.type && <Message type={message.type}>{message.text}</Message>}
          <Footer />
        </>
      )}
    </>
  )
}
