import { is } from 'date-fns/esm/locale';
import {createContext, useState, ReactNode, useContext} from 'react'

type Episode= {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({children}: PlayerContextProviderProps){

    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isShuffling, setIsShuffling] = useState(false)
    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
     setIsPlaying(true)
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay(){
        setIsPlaying(!isPlaying)
    }

    function toggleLoop(){
        setIsLooping(!isLooping);
    }

    function toggleShuffle(){
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state:boolean){
        setIsPlaying(state)
    }
    function clearPlayerState(){
        setEpisodeList([])
        setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

    function playNext(){

        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        }else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious(){
        const previousEpisodeIndex = currentEpisodeIndex - 1;

        if(hasPrevious){
            setCurrentEpisodeIndex(previousEpisodeIndex);

        }
    }


  return(
    <PlayerContext.Provider
     value={{
         isPlaying ,
         episodeList, 
         currentEpisodeIndex, 
         play, 
         playList,
         togglePlay, 
         toggleLoop,
         toggleShuffle,
         setPlayingState,
         playNext,
         playPrevious,
         hasNext, 
         hasPrevious,
         isLooping,
         isShuffling,
         clearPlayerState
         }}>
      {children}
    </PlayerContext.Provider>)
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}
