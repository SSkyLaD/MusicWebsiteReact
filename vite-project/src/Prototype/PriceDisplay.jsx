import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
//cần optimize lại rất nhiều
export default function PriceDisplay() {
  function crypto(name, price, change) {
    this.name = name;
    this.price = price;
    this.change = change;
  }

  let mornitoring = JSON.parse(localStorage.getItem("mornitoring"));
  if (!mornitoring || mornitoring.length === 0) {
    mornitoring = ["BTCUSDT", "ETHUSDT", "DOGEUSDT", "EDUUSDT","ALPACAUSDT"];
    localStorage.setItem("mornitoring", JSON.stringify(mornitoring));
  }

  const [symbols, setSymbols] = useState(mornitoring);
  const [price, setPrice] = useState([]);
  const [newSymbol, setNewSymbol] = useState(""); // xử lý form input

  //livetime API update
  async function fetchAPI() {
    try {
      const dataArray = await Promise.all(
        symbols.map(async (symbol) => {
          const response = await fetch(
            `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
          );
          const data = await response.json();
          return new crypto(
            data.symbol,
            data.lastPrice,
            data.priceChangePercent
          );
        })
      );
      setPrice(dataArray);
    } catch (error) {
      console.log(error);
      setSymbols((prev) => {
        const temp = [...prev];
        temp.pop();
        return temp;
      });
    }
  }

  useEffect(() => {
    if (symbols.length > 0) {
      const interval = setInterval(fetchAPI, 2000);
      return () => clearInterval(interval);
    }
  });

  useEffect(() => {
    localStorage.setItem("mornitoring", JSON.stringify(symbols));
    console.log(symbols);
  }, [symbols]);

  function addCoin(event) {
    event.preventDefault();
    if (symbols.length < 5) {
      setSymbols((prevSymbols) => [...prevSymbols, newSymbol]);
    }
    setNewSymbol("");
  }

  function clearSymbols() {
    setSymbols(() => []);
    setPrice(() => []);
  }

  const dataHTML = price.map((value, index) => {
    return (
      <div
        className="coin-container"
        key={index + 1}
        style={
          value.change >= 0
            ? { backgroundColor: "green" }
            : { backgroundColor: "red" }
        }
      >
        <div className="info">
          <p>{value.name.replace(/USDT/g, "/USDT")}</p>
          <p>Price: {value.price.replace(/\.?0+$/, "")}</p>
          <p>Change: {value.change}%</p>
        </div>
      </div>
    );
  });

  return (
    <div className="price-display">
      <div className="add-and-clear">
        <form onSubmit={addCoin}>
          <input
            className="token-input"
            type="text"
            placeholder="Add pair"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
          />
        </form>
        <div className="clear" onClick={clearSymbols}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
      <div className="coin-display">{dataHTML}</div>
    </div>
  );
}
