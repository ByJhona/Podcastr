import { Header } from '../component/Header'
import { Player } from '../component/Player'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { PlayerContext } from '../contexts/PlayerContext'
import {useState} from 'react'


function MyApp({ Component, pageProps }) {
  const [isPlaying, setIsPlaying] = useState(false)
const [episodeList, setEpisodeList] = useState([])
const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

function play(episode) {
  setEpisodeList([episode])
  setCurrentEpisodeIndex(0)
  setIsPlaying(true)
}

function togglePlay(){
  setIsPlaying(!isPlaying)
}

function setPlayingState(state:boolean){
  setIsPlaying(state)
}
  return(
    <PlayerContext.Provider value={{isPlaying ,episodeList, currentEpisodeIndex, play, togglePlay, setPlayingState}}>
      <div className={styles.wrapper}>
        <main>
          <Header/>
          <Component {...pageProps} />
        </main>
        <Player/>

      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
