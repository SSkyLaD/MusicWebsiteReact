
import Clock from "./Clock"
import PriceDisplay from "./PriceDisplay"

export default function CryptoAndStock(){
    return(
        <div className="container-crypto-stock">
            <Clock/>
            <PriceDisplay/>
        </div>
    )
}