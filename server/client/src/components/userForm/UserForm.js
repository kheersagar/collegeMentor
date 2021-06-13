
import React, { useState, useEffect, useReducer, useContext } from 'react';

import "./UserForm.css";
import axios from 'axios';
import { MyContext } from '../../App';
function UserForm() {


    const [isProgress, setIsProgress] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [interest, setinterest] = useState("");
    const [contact, setcontact] = useState("");
    const [location, setlocation] = useState("");
    const [about, setabout] = useState("");
    const [dob, setDob] = useState("");
    const [course, setCourse] = useState("");
    const{dispatch} = useContext(MyContext);
    var data = {};

    async function sendInfo(e) {
      e.preventDefault();
      if(firstName){
        data.firstName = firstName
      }
      if(lastName){
        data.lastName = lastName
      }
      if(email){
        data.email = email
      }
      if(interest){
        data.interest = interest
      }
      if(contact){
        data.contact = contact
      }
      if(location){
        data.location = location
      }
      if(about){
        data.about = about
      }
      if(dob){
        data.dob = dob
      }
      if(course){
        data.course = course
      }
      console.log(data);
      const loginState = await axios.post(`/user_info`,data);
      if(loginState.data){
        setFirstName('')
        setlastName('')
        setemail('')
        setinterest('')
        setcontact('')
        setabout('')
        setlocation('')
        setCourse('')
        setDob('')
        alert("successfully updated");
        dispatch({type:"updated profile"});
      }
      
    }

    return (
        <>
        <form onSubmit={sendInfo}>
            <div className="wrapper">
                <div className="form-wrapper">

                    <h1> User Information</h1>

                      <div style={{display:"flex"}}>
                        <div className="firstName">
                              <label htmlFor="firstName"> First Name</label>
                              <input type="text"  onChange={(e) => {setFirstName(e.target.value)}} value={firstName} />

                          </div>
                          <div className="lastName">
                              <label htmlFor="lastName"> last Name</label>
                              <input type="text"  onChange={(e) => { setlastName(e.target.value) }} value={lastName} />

                        </div>
                      </div>
                      <div style={{display:"flex"}}>
                      <div className="email">
                            <label htmlFor="email"> Email</label>
                            <input type="email"  onChange={(e) => { setemail(e.target.value) }} value={email} />

                        </div>
                        <div className="interest">
                            <label htmlFor="interest"> Interest</label>
                            <input type="text"  onChange={(e) => { setinterest(e.target.value) }} value={interest} />

                        </div>
                      </div>
                      <div style={{display:"flex"}}>
                      <div className="Contact">
                            <label htmlFor="Contact"> Contact No:</label>
                            <input type="number"  onChange={(e) => { setcontact(e.target.value) }} value={contact} />

                        </div>
                        <div className="location">
                            <label htmlFor="I am doing"> Location</label>
                            <input type="text"  onChange={(e) => { setlocation(e.target.value) }} value={location} />

                        </div>
                      </div>
                      <div style={{display:"flex"}}>
                      <div className="Contact">
                            <label htmlFor="Contact">Date Of Birth:</label>
                            <input type="text"   onChange={(e) => { setDob(e.target.value) }} value={dob} />

                        </div>
                        <div className="location">
                            <label htmlFor="I am doing">Course</label>
                            <input type="text"   onChange={(e) => { setCourse(e.target.value) }} value={course} />

                        </div>
                      </div>
                        <div className="About ">
                            <label htmlFor="About us "> About   </label>
                            <input type="text"   onChange={(e) => { setabout(e.target.value) }} value={about} />

                        </div>

                        <div className="createAccount">
                            <button type="submit">UPDATE</button>
                        </div>
                  </div>
              </div>
            </form>
            </>

    );
}
export default UserForm;