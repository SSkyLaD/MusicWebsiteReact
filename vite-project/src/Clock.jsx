import React from "react"

export default function Clock(){
    const [time,setTime] = React.useState({
        year: '',
        month: '',
        date: '',
        day: '',
        hour :'',
        minute:'',
        second:''
    })

    React.useEffect(()=>{
        const interval = setInterval(getTime,1000);
        return () => clearInterval(interval)
    },)

    function normalize(input){
        return(input < 10 ? `0${input}` : `${input}`)
    }

    function getTime(){
        const time = new Date();
        const dayInWeek =['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        dayInWeek.forEach((value,index)=>{
            if(time.getDay()===index) setTime((prev)=>{
                return({...prev, day: value})
            })
        })
        setTime((prev)=>{
            return({...prev,
                year : time.getFullYear(),
                month : time.getMonth(),
                date : time.getDate(),
                hour : normalize(time.getHours()),
                minute : normalize(time.getMinutes()),
                second : normalize(time.getSeconds())
            })
        })
    }

    return (
        <div className="clock">
            <div className="date">
                <div>{time.day}</div>
                <div>{time.date}</div>
                <div>{time.month+1}</div>
                <div>{time.year}</div>
            </div>
            <div className="time-container">
                <div className="number-container">
                    <div className="number">{time.hour}</div>
                    <div className="number-tag">Hour</div>
                </div>
                <p>:</p>
                <div className="number-container">
                    <div className="number">{time.minute}</div>
                    <div className="number-tag">Minute</div>
                </div>
                <p>:</p>
                <div className="number-container">
                    <div className="number">{time.second}</div>
                    <div className="number-tag">Second</div>
                </div>
            </div>
        </div>
    )
}