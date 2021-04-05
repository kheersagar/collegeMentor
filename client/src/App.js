import React, { useState,useEffect } from "react";
import Login from "./components/Login/Login";
import {BrowserRouter as Router, Redirect, Switch,Route,useHistory} from "react-router-dom";
import Register from "./components/Login/Register";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import SideNavigation from "./components/SideNavigation/SideNavigation";
import Contact from "./components/Contact/Contact";
import UserProfile from "./components/UserProfile/UserProfile";
import Category from "./components/Category/Category";
import StudyForm from "./components/StudyForm/StudyForm";
import CircularProgress from '@material-ui/core/CircularProgress';


import TableInfo from "./components/Timetable/TableInfo";
import axios from "axios";

function App() {
  const [content,setContent] = useState(0);
  const [loginStatus,setLoginStatus] = useState(false);
  const [user,setUser] = useState();
  const [userDetails,setUserDetails] = useState();
  const [feedState,setFeedState] = useState();
  const history = useHistory();

axios.defaults.withCredentials =true;

  function handleChange(value){
    setContent(value);
  }
  function handleUserLogin(value){
    setLoginStatus(value);
  }
  
async function check (userName){
   const response = await axios.get("http://localhost:8080/login");
   console.log(loginStatus);
   if(response.data.loggedIn){
     setLoginStatus(loginStatus => response.data.loggedIn);  
   }else{
     history.push("/login");
   }
  }

  function changeUserHandler(val){
    setUser(val);
  }

  function loggedInUserDetails(val){     // to get user details function perfmed in header.js and pass it to side navigation
    setUserDetails(val)
  }

  function postRender(){
    setFeedState(true);
    setTimeout(()=>{
      setFeedState(false);
      console.log("entered")
    },0.1);
  }
function Main(){
  return(
    <>
    {loginStatus ? <Redirect to="/home" /> :
    <Route path="/login" exact  >
    <div className="login">

      <div className="login_page">

      </div>
      {user == "register" ? <Register userHandler={changeUserHandler}/> : <Login login={check} userHandler={changeUserHandler}/>}

    </div>
  </Route>
    }
  {loginStatus ?
  <Route path="/home" exact>
    <Header onChange={handleChange} value={content} loginChange={handleUserLogin} details={loggedInUserDetails} post={postRender} />
    <div className="home_body">
      <div >
        <SideNavigation details={userDetails} value={content} onChange={handleChange}/>
      </div>
      <div className="content_main">
      {content == 0 ?
        <Feed post={feedState}/> 
        : content == 1 ? 
        <Feed post={feedState}/> 
        : content == 5 ? 
        <TableInfo />
        :  content == 4 ?
        <Contact />
        :content ==3?
      <UserProfile />     
        :content == 2 ?
        <Category /> 
         : content == "studyForm"?
         userDetails.data.Role == "admin" ?          //this can only be edited by admin so checking for admin
         <StudyForm /> : <CircularProgress color="secondary" className="progress"/>
         : content == 'profile' ?
        <UserProfile details={userDetails}/> :
         <CircularProgress color="secondary"  className="progress"/>}    
      </div>
      
    </div>
    
  </Route>
  : <Redirect to="/login" />  }

  </>
  )
}

useEffect(()=>{
  check();
  Main();
},[loginStatus]);

  return (
    <>
    <Router >
      <Switch>
        {Main()}
      </Switch>
    </Router>
    </>
  );
}

export default App;
