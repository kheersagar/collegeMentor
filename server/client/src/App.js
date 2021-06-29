import React, { useState,useEffect, useContext, createContext, useReducer } from "react";
import Login from "./components/Login/Login";
import {BrowserRouter as Router, Redirect, Switch,Route,useHistory,} from "react-router-dom";
import Register from "./components/Login/Register";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import Chat from "./components/Chat/Chat";
import SideNavigation from "./components/SideNavigation/SideNavigation";
import Contact from "./components/Contact/Contact";
import UserProfile from "./components/UserProfile/UserProfile";
import Category from "./components/Category/Category";
import StudyForm from "./components/StudyForm/StudyForm";
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import UserForm from "./components/userForm/UserForm";

import TableInfo from "./components/Timetable/TableInfo";
import axios from "axios";
import SearchHeader from "./components/SearchHeader/SearchHeader";

import Recommend from "./components/Recommendation/Recommend"
const MyContext = createContext();

function App() {
  const [content,setContent] = useState(0);
  const [loginStatus,setLoginStatus] = useState(false);
  const [user,setUser] = useState();
  const [userDetails,setUserDetails] = useState();
  const [feedState,setFeedState] = useState();
  const [result,setResult] = useState();
  const [userData,setUserData] = useState();
  const [isChat,setIsChat] = useState(false);
  const [isChatValue,setIsChatValue] = useState();
  const [updateUser,setUpdateUser] = useState(false);
  const [postSearch,setPostSearch] = useState();
  const [isHeader,setIsHeader] = useState(true);

  const history = useHistory();

  axios.defaults.withCredentials =true;

  const initialValues = {
  }
// main state management store
  function render(state,action){

    if(action.type == "search"){
      setResult(action.value);
    }
    if(action.type == "user" || action.type == "profile"){
      console.log(action.type)
      setContent(action.type)
      action.type == "profile" ? setUserDetails(action.value) : setUserDetails({data:action.value})
    }
    if(action.type=='userDetails'){
      console.log(action.value);
      setUserData(action.value);
    }
    if(action.type == "chat"){
      console.log(action.value);
      setIsChat(true);
      setIsChatValue(action.value);
      console.log("actiona",action.value)
    }
    if(action.type == "close"){
      setIsChat(false);
    }
    if(action.type == "updated profile"){
     const profile =  async ()=> {
        const data = await axios.get(`/userDetail`);
          console.log("updated");
          setUserData(data);
      }
      profile();
      setUpdateUser(true);
    }
    if(action.type == "update"){
      setUpdateUser(false);
    }
    if(action.type == "postSearch"){
      console.log("value",action.value);
      setPostSearch(action.value)
    }
  }

  const [allUser,dispatch] = useReducer(render,initialValues);

 async function handleChange(value){
   setTimeout(()=>{
    setContent(value);
   },1)
    setContent("value");
  }
  function handleUserLogin(value){
    setLoginStatus(value);
  }
  
async function check (userName){
   const response = await axios.get(`/login`);
   console.log(loginStatus);
   if(response.data.loggedIn){
     setLoginStatus(response.data.loggedIn);  
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
  
  function wheelHandler(e){
    if(window.innerWidth < 767 ){
      if(e.nativeEvent.wheelDelta > 0){
        console.log("scrolling up")
        setIsHeader(true)
      }else{
        setIsHeader(false)
        console.log("scrolling down")
      }
    }
  }
function Main(){
  return(
    <>
    {loginStatus ? <Redirect to="/home" /> :
    <Route path="/login" exact  >
    <div className="login">

      <div className="login_page">
      {user == "successfully registered" ?
      <>
        <MuiAlert elevation={6} variant="filled"  > successfully Registered</MuiAlert>
        {setTimeout(()=>{
          setUser(" ");
        },3000)}
      </>  
      : null
         }
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
      <div className="content_main"  onWheel={(e)=>{  wheelHandler(e) }}>
      {isChat ? <Chat value={isChatValue} loggedInUser = {userData}/>  : null}
      {content == 0 || content == 1 ?
        <Feed post={feedState}/>
        :content == 5 ? 
        <TableInfo />
        : content == 4 ?
        <Contact />
        : content == 3 ?
        <UserForm />
        :content == 2 ?
        <Category /> 
         : content == "studyForm"?
         userDetails.data.Role == "admin" ?          //this can only be edited by admin so checking for admin
         <StudyForm /> : <CircularProgress color="secondary" className="progress"/>
         : content == 'profile' || content == 'user'?
        <UserProfile details={userDetails} /> :
        content == 'search'? <SearchHeader result={result}/>
        : <CircularProgress color="secondary"  className="progress"/>}    
      </div>
      {content == 0 || content == 1 ?
      <div style={{position:"relative"}} className="recomm_div">
        <Recommend/>
      </div>
      : null}
      
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

useEffect(()=>{
  Main();
  console.log("reload");
},[userDetails]);

  return (
    <>
    <MyContext.Provider value={{allUser,dispatch,result,userData,updateUser,postSearch,isHeader}}>
    <Router >
      <Switch>
        {Main()}
      </Switch>
    </Router>
    </MyContext.Provider>
    </>
  );
}

export default App;
export {MyContext};
