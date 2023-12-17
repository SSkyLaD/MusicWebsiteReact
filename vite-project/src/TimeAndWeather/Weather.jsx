import React from "react";
import clear from '/WeatherIcon/Assets/clear.png';
import cloud from '/WeatherIcon/Assets/cloud.png';
import drizzle from '/WeatherIcon/Assets/drizzle.png';
import rain from '/WeatherIcon/Assets/rain.png';
import snow from '/WeatherIcon/Assets/snow.png';

export default function Weather(props){
    const [weather4h,setWeather4h] = React.useState({
        time: null,
        temperature: null,
        weatherCode: null,
    })
    const [weather1d,setWeather1d] = React.useState({
        time: null,
        temperatureMin: null,
        temperatureMax: null,
        weatherCode: null,
    })

    const[select,setSelect] = React.useState('Hour');

    console.log(props.currentTime);
    console.log(weather4h.time);

    React.useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=> {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            if(select==='Hour'){
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&timezone=Asia%2FBangkok&forecast_days=2`)
                .then(res => res.json())
                .then(data =>{
                    setWeather4h(()=>{
                        return({time:data.hourly.time,temperature:data.hourly.temperature_2m,weatherCode:data.hourly.weathercode})
                    })
                })
                .catch(err =>{
                    console.log(err);
                })
            }
            else{
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok`)
                .then(res => res.json())
                .then(data =>{
                    setWeather1d(()=>{
                        return({time:data.daily.time,temperatureMin:data.daily.temperature_2m_min,temperatureMax:data.daily.temperature_2m_max,weatherCode:data.daily.weathercode})
                    })
                })
                .catch(err =>{
                    console.log(err);
                })
            }
        })
    },[props.currentTime,select])

    function toggleDayHour(){
        if(select==='Day'){
            setSelect('Hour')
        }else setSelect('Day')
    }

    const HTMLArray =[];
    const clearCode =[0,1];
    const cloudyCode =[2,3,45,48];
    const drizzleCode =[51, 53, 55,56, 57];
    const rainCode =[61, 63, 65,66, 67,80, 81, 82,95,96,99];
    const snowCode =[71, 73, 75,77, 85, 86];

    if(select==='Hour'){
        if(weather4h.time===null){
            return(
                <div className="weather">
                    <div>Loading</div>
                </div>
            )
        }else{
            const index = weather4h.time.indexOf(props.currentTime);
            for(let i = index; i<index+6;i++){
                const regex = /T(.*)/;
                const match = weather4h.time[i].match(regex);
                let url;
                if(clearCode.includes(weather4h.weatherCode[i])){
                    url = clear;
                } else if(cloudyCode.includes(weather4h.weatherCode[i])){
                    url = cloud;
                } else if(drizzleCode.includes(weather4h.weatherCode[i])){
                    url = drizzle;
                } else if(rainCode.includes(weather4h.weatherCode[i])){
                    url = rain;
                } else if(snowCode.includes(weather4h.weatherCode[i])){
                    url = snow;
                }
                HTMLArray.push(
                    <div className="weather-day" key={i}>
                        <div>{match[1]}</div>
                        <img src={url} alt="" />
                        <div>{weather4h.temperature[i]+ '℃'}</div>
                    </div>
                )
            }
        }
    }
    if(select ==='Day'){
        if(weather1d.time===null){
            return(
                <div className="weather">
                    <div>Loading</div>
                </div>
            )
        }else{
            for(let i=0; i< weather1d.time.length-1;i++){
                const part = weather1d.time[i].split('-')
                let url;
                if(clearCode.includes(weather1d.weatherCode[i])){
                    url = clear;
                } else if(cloudyCode.includes(weather1d.weatherCode[i])){
                    url = cloud;
                } else if(drizzleCode.includes(weather1d.weatherCode[i])){
                    url = drizzle;
                } else if(rainCode.includes(weather1d.weatherCode[i])){
                    url = rain;
                } else if(snowCode.includes(weather1d.weatherCode[i])){
                    url = snow;
                }
                HTMLArray.push(
                    <div className="weather-day" key={i}>
                        <div>{`${part[2]}-${part[1]}`}</div>
                        <img src={url} alt="" />
                        <div>{Math.round(weather1d.temperatureMin[i])+ '℃-'+ Math.round(weather1d.temperatureMax[i])+'℃'}</div>
                    </div>
                )
            }
        }
    }

    return(
        <div className="weather">
            {HTMLArray}
            <button onClick={toggleDayHour}>{select}</button>
        </div>
    )
}