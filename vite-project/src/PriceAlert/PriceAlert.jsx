import React, { useEffect } from "react";
import "./PriceAlert.css";

class crypto{
    constructor(name,currentPrice,dayChange){
        this.name = name;
        this.currentPrice =currentPrice;
        this.dayChange = dayChange;
    }
}

export default function PriceAlert(){
    const [list,setList] = React.useState(["BTCUSDT", "ETHUSDT", "DOGEUSDT", "EDUUSDT","ALPACAUSDT"]);
    const [display,setDisplay] = React.useState(<div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>Loading</div>);
    //Cần sưa tiếp để xử lý lỗi
    async function fethAPI(list){
        const array = await Promise.all(
            list.map(async (input,index)=>{
                const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${input}`);
                try{
                    if(!response.ok){
                        return(
                            <div className="price-component" key={index}>
                                <div>{input}</div>
                                <div className="data">
                                    <div>error</div>
                                    <div>error</div>
                                </div>
                            </div>
                        )
                    }
                    const data = await response.json();
                    return(
                        <div className="price-component" key={index} style={ data.priceChangePercent<0 ? {color : 'red'} : {color : 'green'}}>
                            <div style={{fontWeight : 'bold'}}>{input}</div>
                            <div className="data">
                                <div>{parseFloat(data.lastPrice)}</div>
                                <div><span>{ data.priceChangePercent<0 ? '▼' : '▲'}</span>{data.priceChangePercent}%</div>
                            </div>
                        </div>                   
                    )
                } catch{
                    return(
                        <div className="price-component" key={index}>
                            <div>{input}</div>
                            <div className="data">
                                <div>error</div>
                                <div>error</div>
                            </div>
                        </div>
                    )                    
                }
            })
        )
        setDisplay(array);
    }
    useEffect(()=>{
        const interval = setInterval(()=>fethAPI(list),3000);
        return () =>clearInterval(interval);
    })

    return(
        <div className="container-price-alert">
            {display}
        </div>
    )
}