/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faRotateRight, faBackward, faForward, faVolumeXmark, faVolumeHigh, faPause} from '@fortawesome/free-solid-svg-icons'
import React from "react";

export default function MusicSpace(props) {
    const {name ,artist ,directory, coverimage} = props.musicData[props.musicIndex];
    const [musicSpace,setMusicSpace] = React.useState({
        nowtimeInSec : 0,
        fulltimeInSec : 0,
        isPlayed : false,
        isMuted : false,
        isLooped : false
    })

    React.useEffect(() => {
        if (props.play === true) {
            const song = document.querySelector('.song');
            song.play();
            setMusicSpace(prev => {
                return { ...prev, isPlayed: true };
            });
        }
    }, [directory]);
    
    function timeConvert(number){
        const minute = Math.floor(number/60);
        const second = Math.floor(number % 60);
        const formatedMinute = minute < 10 ? `0${minute}` : `${minute}`;
        const formatedSecond = second < 10 ? `0${second}` : `${second}`;
        return `${formatedMinute}:${formatedSecond}`;
    }

    function handleLoadMetadata(event){
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
        if(parseInt(musicSpace.nowtimeInSec) === parseInt(musicSpace.fulltimeInSec)){
            props.returnIndex(props.musicIndex + 1);
        }
    }

    function handleTimeChangeSlider(event) {
        const newTime = parseFloat(event.target.value);
        const song = document.querySelector('.song');
        song.currentTime = newTime;
        setMusicSpace((prev)=>{
            return({...prev,nowtimeInSec : newTime});
        })
    }

    function playMusic(){
        const song = document.querySelector('.song')
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
        setMusicSpace((prev)=>{
            return({...prev, isLooped : !prev.isLooped})
        })
    }

    return (
    <div className="music-space">
        <h2 className="song-name">{name}</h2>
        <p className="artist">{artist}</p>
        <img src={coverimage} alt="Album Cover" className="music-img" />
        <audio className="song"
            src={directory}  
            type="audio/flac" 
            onLoadedMetadata={handleLoadMetadata}
            onTimeUpdate = {handleTimeUpdate}
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
                <div className="loop" onClick={loop}>
                    {musicSpace.isLooped ? <FontAwesomeIcon icon={faRotateRight} style={{opacity : "0.5"}} /> : <FontAwesomeIcon icon={faRotateRight} />}
                </div>
                <div className="backward" onClick={()=> props.returnIndex(props.musicIndex - 1)}><FontAwesomeIcon icon={faBackward} /></div>
                <div className="play" onClick={playMusic}>
                    {musicSpace.isPlayed ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} /> }
                </div>
                <div className="forward" onClick={()=> props.returnIndex(props.musicIndex + 1)}><FontAwesomeIcon icon={faForward} /></div>
                <div className="volume"  onClick={mute}>
                    {musicSpace.isMuted ? <FontAwesomeIcon icon={faVolumeXmark} /> : <FontAwesomeIcon icon={faVolumeHigh} />}   
                </div>
            </div>           
        </div>
    </div>
    );
}