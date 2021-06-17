import React, { useState,useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./Login.css";
import Button from "../Button/Button";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import {BrowserRouter as Router, Redirect, Switch,Route,useHistory} from "react-router-dom";

function Login(props) {
  const[progress,setProgress] = useState(false);
  const[alert,setAlert]=useState(false);
  const history = useHistory();

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
  });

axios.defaults.withCredentials= true;
  const formSubmit = async (values) => {
    console.log(values.username, values.password);
    try {
      const loginState = await axios.request({
        method: 'POST',
        url: `/login`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: `${values.username}`,
          password: `${values.password}`
        }
      })
      if(loginState.data.state == "loggedIn"){
        props.login(loginState.data.userName);
        history.push("/home");
      }else{
        setAlert(true);
        setProgress(false);
        setTimeout(()=>{
          setAlert(false);
        },3000);
      }
      
    }
    catch (e) {
      console.log(e);
    }

  }

  return (
    <>

      <div className="auth_details">
      
        <div className="textANI three">
        <span>W</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span><span>e</span><br/><span>B</span><span>a</span><span>c</span><span>k</span>
        </div>
        <p >To keeppppp connected with us please login with your perosinal informmation by email address and password <NotificationsIcon style={{ color: "orange" }} /> </p>

        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            formSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="auth_field_username" >
              <MuiAlert elevation={6} variant="filled" severity="error"  style={{position:"fixed",top:"12vh",zIndex:"1000",display:alert ? "flex" : "none"}}> Incorrect Credentials</MuiAlert>
                <div className="email_icon">
                  <MailOutlineIcon fontSize="large"  />
                </div>
                <div style={{  width: "100%" , margin: "-17px 16px 27px 10px;",backgroundColor:"transparent" }} className="test_username">
                  <span style={{ color: "grey", fontSize: "1.6rem" }}>Username</span>
                  <br />
                  <Field name="username" type="text" className="in" />
                  {errors.username && touched.username ? (
                    <div>{errors.username}</div>
                  ) : null}
                </div>
              </div>

              <div className="auth_field_password">
                <div className="password_icon">
                  <LockOutlinedIcon fontSize="large" />
                </div>
                <div style={{ width: "100%  " ,backgroundColor:"transparent" }}  className="test_password"  >
                  <span style={{ color: "grey", fontSize: "1.6rem" }}>Password</span>
                  <br/>
                  <Field name="password" type="password"   className="pass" />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div style={{display:"flex"}}>
                <div>
                  <button type="submit" className="login_button" onClick={(()=>{setProgress(true);})} > {progress ? <CircularProgress size={20} thickness={4} color="secondary" /> : "Login"} </button>
                </div>
                <div>
                  <Button type="button" value="Create Account" className="create_account_button" onClick={()=> props.userHandler("register")}/>
                </div>
              </div>

            </Form>
          )}
        </Formik>

      </div>
    </>
  )
}

export default Login;
