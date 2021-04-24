import { Header } from '../component/Header'
import { Player } from '../component/Player'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'



function MyApp({ Component, pageProps }) {
  return(
    <div className={styles.wrapper}>
      <main>
        <Header/>
        <Component {...pageProps} />
      </main>
      <Player/>

    </div>
  )
}

export default MyApp
