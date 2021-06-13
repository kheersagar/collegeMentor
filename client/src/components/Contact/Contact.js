import React, { useState } from 'react';
import "./Contact.css";
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import MailOutlineSharpIcon from '@material-ui/icons/MailOutlineSharp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';

function Contact() {

    const [isProgress,setIsProgress] = useState(false);
    const[fname,setFname] = useState();
    const[lname,setlname] = useState();
    const[email,setemail] = useState();
    const[PNumber,setPNumber] = useState();
    const[subject,setsubject] = useState();
    const[alert,setAlert] = useState(false);

    async function submitHandler(e){
        e.preventDefault();
        const obj = {
            firstname: fname,
            lastname:lname,
            email:email,
            number:PNumber,
            subject:subject

        }
        console.log(obj);
     const response =  await axios.post(`${process.env.REACT_APP_BASE_URL}/contact`,obj);
     if(response.data){
         setTimeout(()=>{
            setIsProgress(false);
            setFname('');
            setPNumber('');
            setemail('');
            setemail('');
            setsubject('');
            setlname('');
            setAlert(true);
         },1000);
         setTimeout(()=>{
            setAlert(false);
         },3000);
     }
    }
    function clickHandler(e){
        setIsProgress(true);
        submitHandler(e)
    }
    return (
       <form  >
       <MuiAlert elevation={6} variant="filled"  style={{position:"fixed",top:"12vh",zIndex:"1000",display:alert ? "flex" : "none"}}> successfully Registered</MuiAlert>
        <div className="container">
            <div className="row_main contact_form">
                <div className="column-1">
                <div className="contact_heading">
                    <div style={{fontWeight:"700px"}}>Send a Message</div>
                    <div><MailOutlineIcon fontSize="large"/></div>
                </div>
                 <div className="col-50">
                     <div>
                        <TextField type="text" id="fName" className="F_Name" autoComplete="off" name="firstname" label="First Name"  variant="outlined" value={fname} onChange={(e)=>{setFname(e.target.value)}}/>
                        <TextField type="text" id="lName" className="L_Name" autoComplete="off" name="lastname" label="Last Name"  variant="outlined" value={lname} onChange={(e)=>{setlname(e.target.value)}}/>
                    </div>
                    <div>
                        <TextField type="text" id="email" className="Em_address" autoComplete="off" name="email" label="Email Address" variant="outlined" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                        <TextField type="text" id="PNumber" className="Phone_No" autoComplete="off" name="PNumber" label="Phone Number"variant="outlined" value={PNumber} onChange={(e)=>{setPNumber(e.target.value)}}/>
                    </div>
                    </div>
                    <div className="row-1">
                        <TextField id="subject" className="Sub_help" autoComplete="off" name="subject" label="How can we help you ?...." variant="outlined" value={subject} onChange={(e)=>{setsubject(e.target.value)}}/>
                        <div>
                        <button type="button" className="submit_button" onClick={clickHandler}> {isProgress ? <CircularProgress size={20} thickness={4} color="secondary" /> : "SUBMIT"}  </button>    
                        </div>      
                    </div>
                </div>
                <div className="column-2">
                    <p>Contact info</p>
                    <div className="phone-icon">
                        <PhoneAndroidOutlinedIcon fontSize="large"/>
                        <a href="tel:+1123-456-7890" >123-456-7890</a>
                    </div>
                    <div className ="message-icon">
                        < MailOutlineSharpIcon  fontSize="large"/>
                        <a href="mailto:email@example.com" > email@example.com </a>
                    </div>
                    <div className="socialmedia_icon">
                        <div className="Fb_icon">
                        <FacebookIcon  fontSize="large" href=""/>
                        </div>
                        <div className="Insta_icon">
                        <InstagramIcon fontSize="large" href="" />  
                        </div>
                        <div className="Twiter_icon">
                        <TwitterIcon fontSize="large"  href=""/> 
                        </div>
                        <div className="In_icon">
                        <LinkedInIcon  fontSize="large"/>
                        </div>
                        <div className="Youtube_icon">
                         <YouTubeIcon  fontSize="large" href=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>
    )
}

export default Contact
