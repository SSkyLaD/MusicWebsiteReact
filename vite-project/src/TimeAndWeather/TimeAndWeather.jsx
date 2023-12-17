import Weather from "./Weather"
import Clock from "./Clock"
import './TimeAndWeather.css'
import React from "react"

export default function TimeAndWeather(){
    const [time,setTime ] = React.useState();
    console.log(time);

    function updateTime(time){
        setTime(time)
    }

    return(
        <div className="container-time-weather">
            <Clock
                updateTime={updateTime}    
            />
            <Weather
                currentTime={time}
            />
        </div>
    )
}