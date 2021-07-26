import React, { useEffect, useState } from "react";
import NavBar from "../nav-bar/NavBar";
import DatePicker from 'react-date-picker';
import './FuelQuote.scss';
import { getUserId } from "../../verifyLogin";

const FuelQuote = () => {

    let address = {
        address1: "",
        address2: " ",
        city: " ",
        state: " ",
        zip: " "
    }

    const [gallonsRequestedState, setGallonsRequested] = useState("");
    const [currAddress, setCurrAddress] = useState(" ")
    const [deliveryAddressState, setDeliveryAddressState] = useState(address);
    const [deliveryDateState, setDeliveryDateState] = useState(new Date());
    const [suggestedPriceState, setSuggestedPriceState] = useState(" ");
    const [amountDueState, setAmountDueState] = useState(" ");
    const [historyState, setHistoryState] = useState(false)
    const nothing = () => {}


    useEffect(() => {
        fetch(`${process.env.API_URL}/api/fuelquote?token=${localStorage.getItem('token')}&username=${getUserId()}`,
        {
          method: 'GET',
        }
        )
        .then((response) => response.json())
        .then((result) => {
          console.log('Success: ', result);

          if (result.address1 == undefined || result.city == undefined || result.state == undefined || result.zipcode == undefined){
            alert("Please enter profile credentials")
            window.location.assign("/profile")
        }

          address.address1 = result.address1
          address.address2 = result.address2
          address.city = result.city
          address.state = result.state
          address.zip = result.zipcode

          setDeliveryAddressState(address)
          setCurrAddress(address.address1)
          setHistoryState(result.history)
        })
        .catch((error) => {
          console.log('Error: ', error.response.data);
        })
      }, [])

    const handleCalculate = () => {
        const CURRENT_PPG = 1.5
        let LOCATION_FACTOR
        let RATE_HISTORY
        let GALLONS_REQUESTED_FACTOR
        const COMPANY_PROFIT_FACTOR = .1

        if(deliveryAddressState.state == 'TX') LOCATION_FACTOR = .02
        else LOCATION_FACTOR = .04

        if (historyState == true) RATE_HISTORY = .01
        else RATE_HISTORY = 0

        if (parseInt(gallonsRequestedState) > 1000) GALLONS_REQUESTED_FACTOR = .02
        else GALLONS_REQUESTED_FACTOR = .03

        let MARGIN = (CURRENT_PPG * (LOCATION_FACTOR - RATE_HISTORY + GALLONS_REQUESTED_FACTOR + COMPANY_PROFIT_FACTOR))
        console.log(MARGIN)
        let tempSuggestedPPG = CURRENT_PPG + MARGIN
        setSuggestedPriceState(tempSuggestedPPG)
        let tempAmountDue = parseInt(gallonsRequestedState) * tempSuggestedPPG
        setAmountDueState(tempAmountDue)
    }


    const handleSubmit = () => {

        let tempAddress = {
            address: currAddress,
            city: deliveryAddressState.city,
            state: deliveryAddressState.state,
            zip: deliveryAddressState.zip
        }
        console.log(tempAddress)

        const formData = new FormData();

        formData.append('gallonsRequested', gallonsRequestedState)
        formData.append('deliveryAddress', JSON.stringify(tempAddress))
        formData.append('deliveryDate', deliveryDateState.toISOString().substring(0,10))
        formData.append('suggestedPrice', suggestedPriceState)
        console.log(suggestedPriceState)
        formData.append('amountDue', amountDueState)
        console.log(amountDueState)

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
              alert("Thank you!")
              window.location.assign("/home")
            })
            .catch((error) => {
              console.error("Error: ", error);
            });
        };

    const handleClick = () => {
        if (currAddress == deliveryAddressState.address1)
            if(deliveryAddressState.address2 != 'N/A')
            setCurrAddress(deliveryAddressState.address2)
            else
            alert("No other address")
        else
            setCurrAddress(deliveryAddressState.address1)
    }

    

    return(
        <div>
        <NavBar/>
        <div className="fuelquote">
            <div className="fuelquote__container">
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
                            readOnly={!!currAddress}
                            value={currAddress}
                            onChange={currAddress ? nothing : setCurrAddress}
                        />
                        <input className = "city"
                            type="text"
                            name="city"
                            id="city"
                            readOnly={!!deliveryAddressState.city}
                            value={deliveryAddressState.city}
                            onChange={deliveryAddressState.city ? nothing : setDeliveryAddressState}
                        />
                        <input className="state"
                            type="text"
                            name="state"
                            id="state"
                            readOnly={!!deliveryAddressState.state}
                            value={deliveryAddressState.state}
                            onChange={deliveryAddressState.state ? nothing : setDeliveryAddressState}
                        />
                        <input className="zip"
                            type="text"
                            name="zip"
                            id="zip"
                            readOnly={!!deliveryAddressState.zip}
                            value={deliveryAddressState.zip}
                            onChange={deliveryAddressState.zip ? nothing : setDeliveryAddressState}
                        />
                    </div>
                </div>
                <div className = "button2">            
                    <button
                            name = "changeAddress"
                            id = "changeAddress"
                            onClick={handleClick}
                    >
                        Change Address
                    </button>
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
                        value="Get Fuel Quote"
                        disabled = {!gallonsRequestedState}
                        onClick={handleCalculate}
                    />
                    <input 
                        className="calculate"
                        type= "button" 
                        value="Submit"
                        disabled = {suggestedPriceState == " " || amountDueState == " "}
                        onClick={handleSubmit}
                    />
                </div>
            </div>

        </div>
        </div>
    );
}

export default FuelQuote;