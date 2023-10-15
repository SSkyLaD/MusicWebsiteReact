import React from "react"
import MusicSpace from "./MusicSpace"
import PlayListSpace from "./PlayListSpace"
import { musicData } from "./material/data"

export default function MusicPlayer(){
    const primaryMusicData = musicData;
    const [control, setControl] = React.useState({
      musicData : primaryMusicData,
      musicIndex : 0,
      autoPlay : false, //điều khiển autoplay khi next hoặc chọn bài trong list
    });
  
  
    function clickSuffer(){
      const array = [...control.musicData];
      let currentIndex = array.length,  randomIndex;
  
      while (currentIndex > 0) {
    
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      setControl((prev)=>{
        return({...prev, musicData : array, musicIndex : 0})
      })
    }
  
    function returnIndex(data){
      let value;
      if(data < 0){
        value = musicData.length - 1;
      } else if(data > musicData.length -1){
        value = 0;
      } else {
        value = data;
      }
      setControl((prev)=>{
        return({...prev, musicIndex : value, autoPlay : true})
      })
    }
  
    return(
      <div className="container-music-player">
        <MusicSpace
          musicIndex ={control.musicIndex}
          returnIndex ={returnIndex}
          musicData ={control.musicData}
          autoPlay = {control.autoPlay}
          suffer = {clickSuffer}
        />
        <PlayListSpace
          musicIndex ={control.musicIndex}
          returnIndex={returnIndex}
          musicData ={control.musicData}
          autoPlay = {control.autoPlay}
        />      
      </div>
    )
}