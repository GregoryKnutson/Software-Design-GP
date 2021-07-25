import React, { useState } from "react";
import NavBar from "../nav-bar/NavBar";
import "./Home.css"

const Home = () => {

    return(
            <body>
                <NavBar/>
                <h1>Welcome!</h1>
                <label>Get your fuel quote!</label>
            </body>
    );
}

export default Home