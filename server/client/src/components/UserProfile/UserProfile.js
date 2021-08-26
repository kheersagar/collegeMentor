import React, { useContext, useEffect, useState } from 'react'
import "./UserProfile.css";
import Feed from "../Feed/Feed"

import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import {Avatar,IconButton,makeStyles } from '@material-ui/core';
import { MyContext } from '../../App';

function UserProfile(props) {
  const {userData} = useContext(MyContext)
  console.log("userdata",userData);
    const {username,email,_id,about,location,firstName,lastName,course,dob,interest,contact} =  props.details.data; 
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        large: {
          width: theme.spacing(10),
          height: theme.spacing(10),
        },
      }));

      const classes = useStyles();
        
    return (
        <div className="Main_container">
            <div className="col-1">
              <div className="upper__profile">
                <div className="upper__profile__avatar">
                  <Avatar  src="https://thumbs.dreamstime.com/b/businessman-profile-icon-male-portrait-flat-design-vector-illustration-47075259.jpg" className={classes.large} /> 
                </div>
                <div className="upper__profile__button">                
                  <IconButton > 
                      <AddCircleSharpIcon style={{color:"navy"}} className="profile__add__button"/>
                  </IconButton> 
                </div>
                <div className="upper__profile__about">
                <p style={{paddingLeft:"15px"}}>{username}</p>
                <b>Student</b>
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
                </div>
              </div>

                <div className="About_me">
                  {about}
                </div>
                <div className="profile_content">
                    <div>
                    </div>
                    <div>
                      <span class="label DOB">Date of birth: </span>{dob}
                    </div>
                    <div>
                    </div>
                    <div>
                      <span class="label Collage">Collage:</span>O.P Jindal university,C.G
                    </div>
                    <div>
                      <span class="label Study">Course:</span>{course}
                    </div>
                    <div>
                      <span class="label Batch-year">Interest:</span>{interest}
                    </div>
                    <div>
                      <span className="label PNumber">Phone-No:</span><a href={`tel:${contact}`} style={{color:"black", textDecoration:"none"}}>{contact}</a>
                    </div>
                    <div>
                      <span className="label Email">Email-Id:</span> <a href="mailto:email@example.com" style={{color:"white", textDecoration:"none"}}> {email} </a>             
                    </div>
                    -
                </div>
            </div>
            <div className="col-2">
                <div className="Nav_box">
                    <div>post</div>
                    {/* <div>Recommendation</div> */}
                </div>
                <Feed  class1="main" class2="main2" headers='userProfileData' id={_id}/>
            </div>
        </div>
    )
}

export default UserProfile;
