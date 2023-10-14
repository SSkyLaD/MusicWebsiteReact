import React from "react"
import MusicSpace from "./MusicSpace"
import PlayListSpace from "./PlayListSpace"
import './App.css'
import { musicData } from "./material/data"


export default function App(){
    const [control, setControl] = React.useState({
      musicIndex : 0,
      play : false
    });

    console.log(control.musicIndex);


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
        return({...prev, musicIndex : value, play : true})
      })
    }

  return(
    <div className="container">
      <MusicSpace
        musicIndex ={control.musicIndex}
        returnIndex ={returnIndex}
        musicData ={musicData}
        play = {control.play}
      />
      <PlayListSpace
        musicIndex ={control.musicIndex}
        returnIndex={returnIndex}
        musicData ={musicData}
        play = {control.play}
      />      
    </div>
  )
}