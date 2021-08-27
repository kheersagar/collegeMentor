import React, { createContext, useEffect, useState,useContext } from 'react'
import {useHistory} from "react-router-dom";
import "./Header.css";
import Dialog from "../Dialog/Dialog";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import BusinessCenterRoundedIcon from '@material-ui/icons/BusinessCenterRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import TextField from '@material-ui/core/TextField';
import DehazeRoundedIcon from '@material-ui/icons/DehazeRounded';
import CodeIcon from '@material-ui/icons/Code';


import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Post from '../Post/Post';
import logo from '../../Images/collegMentor.png'
import axios from 'axios';
import List from "../List/List";
import { MyContext } from '../../App';
import {CSSTransition} from 'react-transition-group';

function Header(props) {
  const [isModal,setIsModal] = useState(false);
  const [home_active,setHomeActive] = useState(false);
  const [user_active,setUserActive] = useState(false);
  const [member_active,setMemberActive] = useState(false);
  const [Code,setCode] = useState(false);
  const [help_active,setHelpActive] = useState(false);
  const [allUserDetails,setAllUserDetails] = useState();
  const [searchQueryResult,setSearchQueryResult] = useState();
  const [isSearchEmpty,setIsSearchEmpty] = useState(false);
  const [dropdown,setDropDown] = useState(false);
  const history = useHistory();

  const {allUser,dispatch,updateUser,isHeader} = useContext(MyContext) ///using the context

  function OpenModal(){
      setIsModal(true); 
  }

  function HandleChange(){    // This is a callback function, if the close button is clicked 
    setIsModal(false)
  }

 async function end(){
    const logOutStatus = await axios.post(`/logout`);
    console.log(logOutStatus)
    if(logOutStatus.data.logOut == true){
      history.push("/login");
      props.loginChange(false);
    }
  }

  async function userDetail(){                                                                            //to get user details
    const userDetails = await axios.get(`/userDetail`);
    props.details(userDetails)                                                                            //calling function written in app.js
    setAllUserDetails(userDetails);
    dispatch({type:"userDetails",value:userDetails});
  }
  if(updateUser){
    userDetail();
    dispatch({type:"update"});
  }

 async function searchHandler(event){
    const value = event.target.value;
    const all =  await axios.post(`/all`,{value:value});
    setSearchQueryResult(all)
    if(value){
      setIsSearchEmpty(true)
      //to check enter is pressed in the search bar
      if(event.keyCode == 13){
        console.log("enter")
        dispatch({type:"search",value:searchQueryResult})
        dispatch({type:"postSearch",value:value});
        props.onChange("search");
        setIsSearchEmpty(false)

        await axios.post(`/keyword`,{value:value});
      }
    }else{
      console.log("false")
      setIsSearchEmpty(false)
    }

  }

function postRender(){
  props.post();
}

 function HeaderMiddle(){
    return(
      <div className="header_middle">
              <div className="header_icon">
                <div class="tooltip" style={{borderBottom: home_active || props.value == 0 ? "3px solid blue" : null}}>
                  <IconButton onClick={()=>{
                    props.onChange(1)
                    setMemberActive(false);
                    setUserActive(false);
                    setHelpActive(false);
                    setCode(false);
                    setHomeActive(true);}}>
                    <HomeRoundedIcon fontSize="medium"  style={{color: home_active || props.value == 0 ? "blue" : null}}/>
                  </IconButton>
                  <span class="tooltiptext">Home</span>
                </div>
              </div>
              <div className="header_icon">
              <div class="tooltip" style={{borderBottom: user_active ? "3px solid blue" : null}}>
                <IconButton  onClick={()=>{
                  props.onChange(2)
                  setMemberActive(false);
                  setUserActive(true);
                  setHelpActive(false);
                  setCode(false);
                  setHomeActive(false);
                  }}>
                  <BusinessCenterRoundedIcon fontSize="medium" style={{color: user_active  ? "blue" : null}}/>
                </IconButton>
                <span class="tooltiptext">Materials</span>
              </div>
                </div>
                <div className="header_icon">
                <div class="tooltip" style={{borderBottom: member_active ? "3px solid blue" : null}}>
                <IconButton onClick={()=>{
                  props.onChange(3)
                  setMemberActive(true);
                  setUserActive(false);
                  setHelpActive(false);
                  setCode(false);
                  setHomeActive(false);
                  }} >
                  <PeopleAltRoundedIcon fontSize="medium" style={{color: member_active  ? "blue" : null}} />
                  </IconButton>
                  <span class="tooltiptext">UserForm</span>
                </div>
                </div>
                <div className="header_icon">
                <div class="tooltip" style={{borderBottom: Code ? "3px solid blue" : null}}>
                <IconButton onClick={()=>{
                  props.onChange(5)
                  setMemberActive(false);
                  setUserActive(false);
                  setHelpActive(false);
                  setHomeActive(false);
                  setCode(true);
                  }} >
                  <CodeIcon fontSize="medium" style={{color: Code  ? "blue" : null}} />
                  </IconButton>
                  <span class="tooltiptext">Code</span>
                </div>
                </div>
                <div className="header_icon">
              <div class="tooltip" style={{borderBottom: help_active ? "3px solid blue" : null}}>
                <IconButton onClick={()=>{
                  props.onChange(4)
                  setMemberActive(false);
                  setUserActive(false);
                  setHelpActive(true);
                  setHomeActive(false);
                  setCode(false);
                  }} >
                  <ContactSupportRoundedIcon fontSize="medium" style={{color: help_active  ? "blue" : null}}/>
                  </IconButton>
                  <span class="tooltiptext">Help</span>
              </div>
                </div>
            </div>
    )
  }

  function HeaderRight(){
    return(
      <>
       <div>
        <buton type="button" onClick={()=>{setDropDown(state => !state)}} className="dropdown_header">
          <DehazeRoundedIcon />
        </buton>
      </div>
      <div className="header_right" style={{display:  window.innerWidth  > 640   ? "flex" : dropdown ? "flex" :"none"  }}>
      <div className="header_profile">
        <IconButton onClick={()=>{dispatch({type:"profile",value:allUserDetails}); setDropDown(false)}}>
          <Avatar src="https://tse1.mm.bing.net/th?id=OIP.6nCVjA0S936UiBlDUsov4QHaE9&pid=Api&P=0&w=245&h=165" fontSize="small" ></Avatar>
        </IconButton>
        <p style={{color:"black" , fontSize:"24px"}}>{allUserDetails ? allUserDetails.data.username : "none"}</p>
      </div>
      <div  className="add">
      <div class="tooltip">
        <IconButton onClick={OpenModal}>
        <Fab color="primary" aria-label="edit" size="small">
        <EditIcon  fontSize="small"/>
      </Fab>
      </IconButton>
        <span class="tooltiptext">Post</span>
          <Post display={isModal? "block" : "none"} onChange = {HandleChange} post={postRender} userDetail={allUserDetails} />
      </div>
      </div>
      <div className="message">
      <div class="tooltip">
      <IconButton onClick={()=>{setDropDown(false)}} >
        <MessageOutlinedIcon  className="header_right_icon"  fontSize="large" />
        </IconButton>
        <span class="tooltiptext">Message</span>
      </div>
      </div>
      <div className="notification">
      <div class="tooltip">
      <IconButton onClick={()=>{setDropDown(false)}}>
        <NotificationsOutlinedIcon  className="header_right_icon" fontSize="large"/>
        </IconButton>.
        <span class="tooltiptext">Notifications</span>
        </div>
      </div>
      <div className="down_arrow">
      <div class="tooltip">
        <Dialog end={end} fontSize="small" onClick={()=>{setDropDown(false)}}/>
      <span class="tooltiptext">logout</span>
        </div>
      </div>
    </div>
    </>
    )
  }

  function mainHeader(){
    return(
      <>
      <CSSTransition         
        timeout={300}
        classNames="header">
      <div className="header_main" style={{display:isHeader ? "flex" : "none"}}>
        <div className="header_left">
              <img src={logo} style={{width:"70px", height:"50px",marginTop:"2px"}}></img>
              <div className="input_field">
              <TextField
                id="outlined-textarea"
                label="Seacrh.."
                placeholder="Your Fav?"
                variant="outlined"
                size="small"
                onKeyUp={searchHandler}
              />
              </div>
            <div className="search_list">
            <List value={searchQueryResult} searchFieldEmpty={isSearchEmpty}/>
            </div>
            </div>
            
            <HeaderMiddle />
            <HeaderRight />
      </div> 
      </CSSTransition>   
      </>
    )
  }
  useEffect(()=>{
    userDetail();
    mainHeader();
  },[]);
  
  
    return (
        <>
          {            
            mainHeader()
          }
        </>
    )
}

export default Header;

