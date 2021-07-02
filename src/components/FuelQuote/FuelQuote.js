import React, { useState } from "react";
import NavBar from "../nav-bar/NavBar";
import DatePicker from 'react-date-picker';
import './FuelQuote.scss';

const FuelQuote = () => {

    const [gallonsRequestedState, setGallonsRequested] = useState("");
    const [deliveryAddressState, setDeliveryAddressState] = useState("1234 Address Test");
    const [deliveryDateState, setDeliveryDateState] = useState(new Date());
    const [suggestedPriceState, setSuggestedPriceState] = useState("12");
    const [amountDueState, setAmountDueState] = useState("500");
    const nothing = () => {}

    return(
        <div>
        <NavBar/>
        <div className="fuelquote">
            <form className="fuelquote__container">
            <div className="title">
            <h1>Fuel Quote</h1>
            </div>
                <div className="formbox">
                <div className= "in">
                    <label>Gallons Requested:</label>
                    <input
                        type="number"
                        value={gallonsRequestedState}
                        onChange={(e)=>setGallonsRequested(e.target.value)}
                    />
                </div>
                <div className= "in">
                    <label>Delivery Address:</label>
                    <input 
                        type="text"
                        readOnly={!!deliveryAddressState}
                        value={deliveryAddressState}
                        onChange={deliveryAddressState ? nothing : setDeliveryAddressState}
                    />
                </div>
                <div className= "in">
                    <label>Suggested Price Per Gallon:</label>
                    <input 
                        type="text"
                        readOnly={!!suggestedPriceState}
                        value={suggestedPriceState}
                        onChange={suggestedPriceState ? nothing : setSuggestedPriceState}
                    />
                </div>
                <div className= "in">
                    <label>Amount Due:</label>
                    <input 
                        type="text"
                        readOnly={!!amountDueState}
                        value={amountDueState}
                        onChange={amountDueState ? nothing : setAmountDueState}
                    />
                </div>
                </div>
                <div className="in">
                    <label>Delivery Date:</label>
                    <DatePicker
                        onChange={setDeliveryDateState}
                        value={deliveryDateState}
                        minDate={new Date()}
                    />
                </div>
                <div className="button">
                    <input 
                        className="calculate"
                        type= "button" 
                        value="Calculate"
                    />
                </div>
            </form>
        </div>
        </div>
    );
}

export default FuelQuote;