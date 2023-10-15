import { useState, useEffect } from "react";

export default function PriceDisplay() {
  const [price, setPrice] = useState({
      nowPriceBTC: "",
      todayChangeBTC: "",
      picUrlBTC:'',
      nowPriceETH: "",
      todayChangeETH: "",
      picUrlETH:'',
      nowPriceDOGE: "",
      todayChangeDOGE: "",
      picUrlDOGE:''
  });

  function fetchAPI() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
        .then((res) => res.json())
        .then((data)=>{
            console.log(data)
            data.forEach((element) => {
                if(element.id==='bitcoin'){
                    setPrice((prev)=>{
                        return({...prev,
                            nowPriceBTC : element.current_price,
                            todayChangeBTC :element.price_change_percentage_24h,
                            picUrlBTC :element.image
                        })
                    })
                }
                if(element.id==='ethereum'){
                    setPrice((prev)=>{
                        return({...prev,
                            nowPriceETH : element.current_price,
                            todayChangeETH :element.price_change_percentage_24h,
                            picUrlETH :element.image
                        })
                    })
                }
                if(element.id==='dogecoin'){
                    setPrice((prev)=>{
                        return({...prev,
                            nowPriceDOGE : element.current_price,
                            todayChangeDOGE :element.price_change_percentage_24h,
                            picUrlDOGE :element.image
                        })
                    })
                }
            });
        })
        .catch((error) => {
            console.error('Lỗi:', error);
      });
  }

  useEffect(() => {
    setInterval(fetchAPI, 60000);
  }, []);

  return (
    <div className="price-display">
        <div className="coin-container" >
            <img src={price.picUrlBTC} alt="" />
            <div className="info">
                <p>Bitcoin</p>
                <p style={price.todayChangeBTC >= 0 ? {color : "green"} : {color :"red"}}>Price: {price.nowPriceBTC}</p>
                <p style={price.todayChangeBTC >= 0 ? {color : "green"} : {color :"red"}}>Change: {price.todayChangeBTC}%</p>
            </div>
        </div>
        <div className="coin-container">
            <img src={price.picUrlETH} alt="" />
            <div className="info">
                <p>Etherium</p>
                <p style={price.todayChangeETH >= 0 ? {color : "green"} : {color :"red"}}>Price: {price.nowPriceETH}</p>
                <p style={price.todayChangeETH >= 0 ? {color : "green"} : {color :"red"}}>Change: {price.todayChangeETH}%</p>
            </div>
        </div>
        <div className="coin-container">
            <img src={price.picUrlDOGE} alt="" />
            <div className="info">
                <p>DogeCoin</p>
                <p style={price.todayChangeDOGE >= 0 ? {color : "green"} : {color :"red"}}>Price: {price.nowPriceDOGE}</p>
                <p style={price.todayChangeDOGE >= 0 ? {color : "green"} : {color :"red"}}>Change: {price.todayChangeDOGE}%</p>
            </div>
        </div>
    </div>
  );
}