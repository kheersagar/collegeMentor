import React from 'react';
import "./Contact.css";
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import MailOutlineSharpIcon from '@material-ui/icons/MailOutlineSharp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';

function Contact() {
    return (
       
        <div className="container">
            <div className="row_main">
                <div className="column-1">
                <div className="contact_heading">
                    <div style={{fontWeight:"700px"}}>Send a Message</div>
                    <div><MailOutlineIcon fontSize="large"/></div>
                </div>
                 <div className="col-50">
                     <div>
                        <input type="text" id="fName" name="firstname" placeholder="First Name"/>
                        <input type="text" id="lName" name="lastname" placeholder="Last Name"/>
                    </div>
                    <div>
                        <input type="text" id="email" name="email" placeholder="Email Address"/>
                        <input type="text" id="PNumber" name="PNumber" placeholder="Phone Number"/>
                    </div>
                    </div>
                    <div className="row-1">
                        <textarea id="subject" name="subject" placeholder="How can we help you ?...."/>
                        <div>
                        <input type="button" className="submit_button" value="SUBMIT"/>     
                        
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
    )
}

export default Contact
