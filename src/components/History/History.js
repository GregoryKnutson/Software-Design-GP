import React, { useEffect, useState } from "react";
import NavBar from "../nav-bar/NavBar";
import * as ReactBootstrap from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserId } from "../../verifyLogin";


const FuelQuoteHistory = () => {


    const histo = [
        {quoteNumber: "", deliveryAddress:"", deliveryDate:"", gallonsRequested: "", suggestedPrice:"", totalAmount:""}
    ]
    console.log(histo)

    const [myhist, sethist] = useState(histo);

    useEffect(() => {
        fetch(`${process.env.API_URL}/api/history?token=${localStorage.getItem('token')}&username=${getUserId()}`,
        {
            method: 'GET',
        }
        )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            sethist(data)
        })
    }, [])

    const renderHistory = (hist, index) => {
        return(
            <tr key={index}>
                <td>{hist.quoteNumber}</td>
                <td>{hist.deliveryAddress}</td>
                <td>{hist.deliveryDate}</td>
                <td>{hist.gallonsRequested}</td>
                <td>{hist.suggestedPrice}</td>
                <td>{hist.totalAmount}</td>
            </tr>
        )
    }

    return(
        <div className="fuelQuoteHistory">
            <NavBar/>
            <h1>Fuel Quote History</h1>
            <ReactBootstrap.Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Quote Number</th>
                        <th>Delivery Address</th>
                        <th>Delivery Date</th>
                        <th>Gallons Requested</th>
                        <th>Suggested Price/Gallon</th>
                        <th>Total Amount Due</th>
                    </tr>
                </thead>
                <tbody>
                    {myhist.map(renderHistory)}
                </tbody>
            </ReactBootstrap.Table>

        </div>
    );
}

export default FuelQuoteHistory;