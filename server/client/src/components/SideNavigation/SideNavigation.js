import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import "./SideNavigation.css";
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import { orange } from '@material-ui/core/colors';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';

function SideNavigation(props) {
    return (
        <>
        
          <div className="side_nav">
            <div className="friends">
              <div>
                <GroupRoundedIcon fontSize="large" color="primary"/>
              </div>
              <div className="side_nav_icon_name">
                Friends
              </div>
            </div>
            <div className="events" onClick={()=>{props.onChange("studyForm")}}>
              <div>
                <SupervisorAccountRoundedIcon fontSize="large" color="secondary"/>
              </div>
              <div className="side_nav_icon_name" onClick={()=>{props.onChange("event")}}>
                Study Form
              </div>
            </div>
            <div className="groups">
              <div>
                <PeopleAltTwoToneIcon fontSize="large" color="primary" />
              </div>
              <div className="side_nav_icon_name">
                Groups
              </div>
            </div>
            <div className="pages">
              <div>
                <FlagRoundedIcon fontSize="large" style={{color:"orange"}} />
              </div>
              <div className="side_nav_icon_name">
                Pages
              </div>
            </div>
            </div>  
        </>
    )
}

export default SideNavigation;
