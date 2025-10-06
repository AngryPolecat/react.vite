import { Outlet } from 'react-router-dom'
import { Header } from '../header/header'
import { Footer } from '../footer/footer'
import styles from './layout.module.css'

export const Layout = () => {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
