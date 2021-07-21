import React, { useState } from "react";
import NavBar from "../nav-bar/NavBar";
import DatePicker from 'react-date-picker';
import './FuelQuote.scss';
import { getUserId } from "../../verifyLogin";

const FuelQuote = () => {

    const tempAddress = {
        address: "1234 Test Address",
        city: "City",
        state: "TX",
        zip: "77423"
    }

    const [gallonsRequestedState, setGallonsRequested] = useState("");
    const [deliveryAddressState, setDeliveryAddressState] = useState(tempAddress);
    const [deliveryDateState, setDeliveryDateState] = useState(new Date());
    const [suggestedPriceState, setSuggestedPriceState] = useState("12");
    const [amountDueState, setAmountDueState] = useState("500");
    const nothing = () => {}



    const handleCalculate = () => {

        const formData = new FormData();

        formData.append('gallonsRequested', gallonsRequestedState)
        formData.append('deliveryAddress', JSON.stringify(deliveryAddressState))
        formData.append('deliveryDate', deliveryDateState)
        formData.append('suggestedPrice', suggestedPriceState)
        formData.append('amountDue', amountDueState)

        fetch(
            `${process.env.API_URL}/api/fuelquote?token=${localStorage.getItem('token')}&username=${getUserId()}`,
            {
              method: "POST",
              mode: "no-cors",
              body: formData,
            }
          )
            .then((response) => response.json)
            .then((result) => {
              console.log("Success: ", result);
            })
            .catch((error) => {
              console.error("Error: ", error);
            });
        };

    

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
                    <input className="numberInput"
                        type="number"
                        name="gallonsRequested"
                        id="gallonsRequested"
                        value={gallonsRequestedState}
                        onChange={(e)=>setGallonsRequested(e.target.value)}
                    />
                </div>
                <div className= "in">
                    <label>Delivery Address:</label>
                    <div className="address">
                        <input className="add"
                            type="text"
                            name="address"
                            id="address"
                            readOnly={!!deliveryAddressState.address}
                            value={deliveryAddressState.address}
                            onChange={deliveryAddressState.address ? nothing : setDeliveryAddressState}
                        />
                        <input className = "city"
                            type="text"
                            name="address"
                            id="address"
                            readOnly={!!deliveryAddressState.city}
                            value={deliveryAddressState.city}
                            onChange={deliveryAddressState.city ? nothing : setDeliveryAddressState}
                        />
                        <input className="state"
                            type="text"
                            name="address"
                            id="address"
                            readOnly={!!deliveryAddressState.state}
                            value={deliveryAddressState.state}
                            onChange={deliveryAddressState.state ? nothing : setDeliveryAddressState}
                        />
                        <input className="zip"
                            type="text"
                            name="address"
                            id="address"
                            readOnly={!!deliveryAddressState.zip}
                            value={deliveryAddressState.zip}
                            onChange={deliveryAddressState.zip ? nothing : setDeliveryAddressState}
                        />
                    </div>
                </div>
                <div className= "in">
                    <label>Suggested Price Per Gallon:</label>
                    <input 
                        type="text"
                        name="pricePerGallon"
                        id="pricePerGallon"
                        readOnly={!!suggestedPriceState}
                        value={suggestedPriceState}
                        onChange={suggestedPriceState ? nothing : setSuggestedPriceState}
                    />
                </div>
                <div className= "in">
                    <label>Amount Due:</label>
                    <input 
                        type="text"
                        name="amountDue"
                        id="amountDue"
                        readOnly={!!amountDueState}
                        value={amountDueState}
                        onChange={amountDueState ? nothing : setAmountDueState}
                    />
                </div>
                </div>
                <div className="in">
                    <label>Delivery Date:</label>
                    <DatePicker
                        name="deliveryDate"
                        id="deliveryDate"
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
                        onClick={handleCalculate}
                    />
                </div>
            </form>
        </div>
        </div>
    );
}

export default FuelQuote;