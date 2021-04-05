import React from 'react'
import "./UserProfile.css";
import Feed from "../Feed/Feed"

import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import {Avatar,IconButton} from '@material-ui/core';

function UserProfile(props) {
    console.log(props.details.data)
    const {username,email} = props.details.data;
    return (
        <div className="Main_container">
            <div className="col-1">
              <div className="upper__profile">
                <div className="upper__profile__avatar">
                  <Avatar  src="https://thumbs.dreamstime.com/b/businessman-profile-icon-male-portrait-flat-design-vector-illustration-47075259.jpg"  /> 
                </div>
                <div className="upper__profile__button">                
                <IconButton > 
                      <AddCircleSharpIcon style={{color:"navy"}} className="profile__add__button"/>
                  </IconButton> 
                </div>
                <div className="upper__profile__about">
                <p>{username}</p>
                <b>Student</b>
                </div>
              </div>

                <div className="About_me">I am a student of OPJU.my branch is cse, right now i am a part of our first group  project which is  a webdeploment, where i am doing mainly front end deveplment.</div>
                <div className="profile_content">
                    <div>
                    <span class="label Gender">Gender </span>Male 
                    </div>
                    <div>
                    <span class="label DOB">Date of birth </span>1 september 2001
                    </div>
                    <div>
                    <span class="label Country">Country</span>India 
                    </div>
                    <div>
                    <span class="label Collage">Collage</span>O.P Jindal university,C.G
                    </div>
                    <div>
                    <span class="label Study">Study</span>B.tech ,cse
                    </div>
                    <div>
                    <span class="label Batch-year">Batch-year</span>2019-2023
                    </div>
                    <div>
                    <span className="label PNumber">Phone-No</span><a href="tel:+1123-456-7890" style={{color:"black", textDecoration:"none"}}>123-456-7890</a>
                    </div>
                    <div>
                    <span className="label Email">Email-Id</span> <a href="mailto:email@example.com" style={{color:"black", textDecoration:"none"}}> {email} </a>             
                    </div>
                    -
                </div>
            </div>
            <div className="col-2">
                <div className="Nav_box">
                    <div>post</div>
                    <div>Recommendation</div>
                    {/* <li>Collection</li> */}
                </div>
                <Feed  class1="main" class2="main2" headers='userProfileData'/>
            </div>
            <div className="col-3">
                <div className="content">
                    <div>OPJU RAIGARH</div>
                    <p>O.P. Jindal University is a private university located in Raigarh, Chhattisgarh, India. It was established by an Act of Legislature in the state assembly of Chhattisgarh in 2014. It was founded by the Jindal Education and Welfare Society. The OP Jindal University has UGC and AICTE affiliation</p>
                    <div style={{paddingTop:"15px"}}>LOCATION</div>
                    <p>Raigarh, Chhattishgarh India</p>
                </div>
                <div className="Social_icon">
                    <div className="Instagram_icon">
                        <InstagramIcon fontSize="large"/>
                    </div>
                    <div className="Facebook_icon">
                        <FacebookIcon fontSize="large"/>
                    </div>
                    <div className="linkdin_icon">
                        <LinkedInIcon fontSize="large"/>
                    </div>
                    <div className="Twitter_icon">
                        <TwitterIcon fontSize="large"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
