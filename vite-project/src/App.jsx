import MusicPlayer from './MusicPlayer/MusicPlayer'
import TimeAndWeather from './TimeAndWeather/TimeAndWeather'
import PriceAlert from './PriceAlert/PriceAlert'
import './App.css'

export default function App(){
  return(
    <div className='all-container'>
      <div className='top-section'>
        <TimeAndWeather/>
      </div>
      <div className='bottom-section'>
        <PriceAlert/>
        <MusicPlayer/>
      </div>
    </div>
  )
}