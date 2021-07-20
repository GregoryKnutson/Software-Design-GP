import React, { useState } from "react";
import NavBar from "../nav-bar/NavBar";
import * as ReactBootstrap from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const FuelQuoteHistory = () => {

    const history = [
        {number: "QT1", address:"Client Address", date:"xx/xx/xxxx", price:"10", total:"1000"}
    ]

    const renderHistory = (hist, index) => {
        return(
            <tr key={index}>
                <td>{hist.number}</td>
                <td>{hist.address}</td>
                <td>{hist.date}</td>
                <td>{hist.price}</td>
                <td>{hist.total}</td>
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
                        <th>Suggested Price/Gallon</th>
                        <th>Total Amount Due</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map(renderHistory)}
                </tbody>
            </ReactBootstrap.Table>

        </div>
    );
}

export default FuelQuoteHistory