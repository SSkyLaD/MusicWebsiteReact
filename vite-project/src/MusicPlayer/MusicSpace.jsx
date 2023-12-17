/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faRepeat , faBackward, faForward, faVolumeHigh, faVolumeXmark, faPause, faShuffle} from '@fortawesome/free-solid-svg-icons'
import React from "react";
import './MusicSpace.css'


export default function MusicSpace(props) {
    const {name ,artist ,directory, coverimage} = props.musicData[props.musicIndex];
    const [musicSpace,setMusicSpace] = React.useState({
        nowtimeInSec : 0,
        fulltimeInSec : 0,
        isPlayed : false,
        isMuted : false,
        volume : 50,
        isLooped : false
    })

    //tắt autoPlay ở lần render đầu tiên
    React.useEffect(() => {
        if (props.autoPlay === true) {
            const song = document.querySelector('.song');
            song.play();
            setMusicSpace(prev => {
                return { ...prev, isPlayed: true };
            });
        }
    }, [props]);
    
    //
    function timeConvert(number){
        const minute = Math.floor(number/60);
        const second = Math.floor(number % 60);
        const formatedMinute = minute < 10 ? `0${minute}` : `${minute}`;
        const formatedSecond = second < 10 ? `0${second}` : `${second}`;
        return `${formatedMinute}:${formatedSecond}`;
    }

    function handleLoadMetadata(event){
        const song = document.querySelector('.song');
        song.volume = musicSpace.volume/100;
        const songDurationInSec = event.target.duration;
        setMusicSpace((prev)=>{
            return({...prev,fulltimeInSec : songDurationInSec})
        })
    }

    function handleTimeUpdate(event){
        const nowInSec = event.target.currentTime;
        setMusicSpace((prev)=>{
            return({...prev,nowtimeInSec : nowInSec});
        })
    }

    function handleTimeChangeSlider(event) {
        const newTime = parseFloat(event.target.value);
        const song = document.querySelector('.song');
        song.currentTime = newTime;
        setMusicSpace((prev)=>{
            return({...prev,nowtimeInSec : newTime});
        })
    }

    function handleTimeEnded(){ 
        if(musicSpace.isLooped === false){
            props.returnIndex(props.musicIndex + 1);
        }
    }

    function playMusic(){
        const song = document.querySelector('.song');
        if(!musicSpace.isPlayed){
            song.play();
            setMusicSpace((prev)=>{
                return({...prev,isPlayed : true});
            })
        }else{
            song.pause();
            setMusicSpace((prev)=>{
                return({...prev,isPlayed : false});
            })
        }
    }

    function changeVolume(event){
        const volume = event.target.value;
        const song = document.querySelector('.song');
        song.volume = volume/100;
        setMusicSpace((prev)=>{
            return({...prev,volume : volume});
        })
    }

    function mute(){
        const song = document.querySelector('.song');
        song.muted = musicSpace.isMuted ? false : true;
        console.log(song.muted)
        setMusicSpace((prev)=>{
            return({...prev, isMuted : !prev.isMuted})
        })
    }

    function loop(){
        const song = document.querySelector('.song');
        song.loop = musicSpace.isLooped ? false : true;
        console.log(song.loop)
        setMusicSpace((prev)=>{
            return({...prev, isLooped : !prev.isLooped})
        })

    }
   function back(){
        props.returnIndex(props.musicIndex - 1);
   }

   function next(){
    props.returnIndex(props.musicIndex + 1);
    }

    return (
    <div className="music-space">
        <div className='song-title'>
            <h2 className="song-name">{name}</h2>
            <p className="artist">{artist}</p>
        </div>
        <img src={coverimage} alt="Album Cover" className="music-img" />
        <audio className="song"
            src={directory}  
            type="audio/flac" 
            onLoadedMetadata={handleLoadMetadata}
            onTimeUpdate = {handleTimeUpdate}
            onEnded={handleTimeEnded}
        />
        <div className="function">
            <div className="progress-bar">
                <p className="nowtime">{timeConvert(musicSpace.nowtimeInSec)}</p>
                <input 
                    type="range" 
                    min="0" 
                    max={musicSpace.fulltimeInSec}
                    id="progress"
                    value={musicSpace.nowtimeInSec}
                    onChange={handleTimeChangeSlider}
                ></input>
                <p className="fulltime">{timeConvert(musicSpace.fulltimeInSec)}</p>
            </div>
            <div className="control-button">
                <div className='volume-change'>
                    <div className='volume-icon-container'>
                        <div className='volume-icon' onClick={mute}>
                            {musicSpace.isMuted ?<FontAwesomeIcon icon={faVolumeXmark} /> : <FontAwesomeIcon className='' icon={faVolumeHigh}  /> }
                        </div>
                    </div>
                    <input 
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        onChange={changeVolume}
                        value={musicSpace.volume}
                    />
                    <div className='volume-number-container'>
                        <div className='volume-number'>{musicSpace.volume}</div>
                    </div>
                </div>
                <div className="loop" onClick={loop}>
                    {musicSpace.isLooped ? <FontAwesomeIcon icon={faRepeat} style={{opacity : "0.5"}} /> : <FontAwesomeIcon icon={faRepeat} />}
                </div>
                <div className="backward" onClick={back}><FontAwesomeIcon icon={faBackward} /></div>
                <div className="play" onClick={playMusic}>
                    {musicSpace.isPlayed ? <FontAwesomeIcon icon={faPause} size='xl' /> : <FontAwesomeIcon icon={faPlay} size='xl' /> }
                </div>
                <div className="forward" onClick={next}><FontAwesomeIcon icon={faForward} /></div>
                <div className="suffer" onClick={props.suffer}>
                    <FontAwesomeIcon icon={faShuffle} />
                </div>
            </div>           
        </div>
    </div>
    );
}