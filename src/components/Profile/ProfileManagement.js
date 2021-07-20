import React, { useState } from "react";
import NavBar from "../nav-bar/NavBar";

function ProfileManagement() {
  const [fullnameState, setfullname] = useState("");
  const [address1State, setaddress1] = useState("");
  const [address2State, setaddress2] = useState("");
  const [cityState, setcity] = useState("");
  const [stateState, setstate] = useState("");
  const [zipState, setzip] = useState("");
  const [errorsState, setErrorsState] = useState({});

  const submitUser = () => {

    function alertObject(obj){      
      for(var key in obj) {
      alert(obj[key]);
      if( typeof obj[key] === 'object' ) {
          alertObject(obj[key]);
      }
      }
  }

    const validate = () =>{
      let errors = {};

      if (fullnameState == '') errors.fullname = "Name can not be blank."
      if (address1State == '' || cityState == '' || stateState == '' || zipState == '') errors.address = "Must have a valid address."
      if (fullnameState.length > 50) errors.fullname = "Name is too long."
      if (address1State.length > 100) errors.address1 = "Address 1 is too long."
      if (address2State.length > 100) errors.address2 = "Address 2 is too long."
      if (cityState.length > 100) errors.city = "City Name is too long."
      if (stateState.length != 2) errors.state = "Choose valid state."
      if (zipState.length < 5 || zipState.length > 9) errors.zip = "Please Enter Valid Zip Code."

      if (Object.keys(errors) !== 0){
        setErrorsState(errors)
        return errors;
      }
    }

    const errors = validate()

    if (Object.keys(errors).length === 0){
      const formData = new FormData();
      formData.append('fullname', fullnameState)
      formData.append('address1',address1State)
      formData.append('address2', address2State)
      formData.append('city', cityState)
      formData.append('state', stateState)
      formData.append('zip', zipState)

      fetch(
        `${process.env.API_URL}/api/profile?token=${localStorage.getItem('token')}`,
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
    }
    else {
      alertObject(errors)
    }

  };
  
  return (
    <div>
      <NavBar></NavBar>
      <header>
        <h1 align="left">Profile Management</h1><br></br>
        <p align="left">In Order to submit a request for fuel, you must first complete your profile.</p>
      </header>
      <form>
        <div>
          <label htmlFor="full_name">Full name:&nbsp;&nbsp;</label>
          <input 
            type="text" 
            id="full_name" 
            name="full_name"
            maxLength="50" 
            size="50" 
            value={fullnameState} 
            onChange={(e)=>setfullname(e.target.value)} 
            required>    
          </input>
        </div>
        <div>
          <br></br>
          <label htmlFor="address1">Address 1:&nbsp;&nbsp;</label> 
          <input 
            type="text" 
            id="address1" 
            name="address1"
            maxLength="100" 
            value={address1State}
            onChange={(e)=>setaddress1(e.target.value)}
            required>
          </input>
          <label htmlFor="address2">&nbsp;&nbsp;&nbsp;Address 2:&nbsp;&nbsp;</label>
          <input 
            type="text" 
            id="address2" 
            name="address2"
            maxLength="100" 
            placeholder="Optional"
            value={address2State}
            onChange={(e)=>setaddress2(e.target.value)}>
          </input>
        </div>
        <div>
         <br></br>
         <label htmlFor="city">City:&nbsp;&nbsp;</label>
         <input 
          type="text" 
          id="city" 
          name="city"
          maxLength="100"
          value={cityState}
          onChange={(e)=>setcity(e.target.value)} 
          required>
        </input>
         <label htmlFor="state">&nbsp;&nbsp;&nbsp;State:&nbsp;&nbsp;</label>
         <select id="state" value={stateState} onChange={(e)=>setstate(e.target.value)} required>
          <option value>Select</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregan</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <label htmlFor="zip">&nbsp;&nbsp;&nbsp;Zip:&nbsp;&nbsp;</label>
        <input 
          type="tel" 
          id="zip" 
          name="zip"
          maxLength="9" 
          minLength="5" 
          value={zipState}
          onChange={(e)=>setzip(e.target.value)}
          required>
        </input> 
        </div>
        <div>
          <br></br>
          <input type="button" value="Submit" onClick={submitUser}></input>
        </div>
      </form>
    </div>
  );
}

export default ProfileManagement;