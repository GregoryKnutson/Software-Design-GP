import React, { useState } from "react";
import NavBar from "../nav-bar/NavBar";

const Home = () => {

    return(
        <div>
            <NavBar/>
            <h1>Welcome!</h1>
            <label>Get your fuel quote!</label>
        </div>
    );
}

export default Home