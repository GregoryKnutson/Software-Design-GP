import React from 'react';
import NavBar from "../nav-bar/NavBar";

function ProfileManagement() {
  return (
    <div>
      <NavBar></NavBar>
      <header>
        <h1 align="left">Profile Management</h1><break></break>
        <p align="left">In Order to submit a request for fuel, you must first complete your profile.</p>
      </header>
      <form>
        <div>
          <label for="full_name">Full name:&nbsp;&nbsp;</label>
          <input type="text" id="full_name" maxlength="50" size="50" required></input>
        </div>
        <div>
          <br></br>
          <label for="address1">Address 1:&nbsp;&nbsp;</label> 
          <input type="text" id="address1" maxlength="100" required></input>
          <label for="address2">&nbsp;&nbsp;&nbsp;Address 2:&nbsp;&nbsp;</label>
          <input type="text" id="address2" maxlength="100" placeholder="Optional"></input>
        </div>
        <div>
         <br></br>
         <label for="city">City:&nbsp;&nbsp;</label>
         <input type="text" id="city" maxlength="100" required></input>
         <label for="state">&nbsp;&nbsp;&nbsp;State:&nbsp;&nbsp;</label>
         <select id="state" required>
          <option disabled selected value>Select</option>
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
         <label for="zip">&nbsp;&nbsp;&nbsp;Zip:&nbsp;&nbsp;</label>
         <input type="tel" id="zip" maxlength="9" minlength="5" required></input> 
        </div>
        <div>
          <br></br>
          <input type="submit"></input>
        </div>
      </form>
    </div>

  );
}

export default ProfileManagement;