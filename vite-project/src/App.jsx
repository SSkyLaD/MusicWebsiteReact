import MusicPlayer from './MusicPlayer'
import WeatherForecast from './WeatherForecast'
import CryptoAndStock from './CryptoAndStock'
import './App.css'

export default function App(){
  return(
    <div className='all-container'>
      <div className='top-section'>
        <CryptoAndStock/>
      </div>
      <div className='bottom-section'>
        <WeatherForecast/>
        <MusicPlayer/>
      </div>
    </div>
  )
}