import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Input from "../Input";
import "./Login.css";
import Button from "../Button/Button";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import FaceIcon from '@material-ui/icons/Face';

function Register(props) {
  const [show, setShow] = useState(false);
  const[progress,setProgress] = useState(false);
  const [isRegistered,setIsRegistered ] = useState();
  

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .required("This field is required"),
    email: Yup.string()
      .required("This field is required")
      .email("Please provide a valid email"),
    password: Yup.string()
      .required("This field is required")
  });


  const formSubmit = async (values) => {
    console.log(values.username, values.email, values.password);
    try {
     const status = await axios.request({
        method: 'POST',
        url: `/register`,
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          username: `${values.username}`,
          email: `${values.email}`,
          password: `${values.password}`
        }
      })
      console.log(status);
      setIsRegistered(status.data.status);
        if(status.data.status ){
          props.userHandler("successfully registered");
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
        <span>W</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span><span>e</span>
        </div>
        <p >To keep connected with us please login with your perosinal informmation by email address and password <NotificationsIcon style={{ color: "orange" }} /> </p>

        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
            formSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="auth_field_username">
                <div className="email_icon">
                  <FaceIcon fontSize="large" />
                </div>
                <div style={{ width: "100%"    }}  className="test_username"  >
                  <span style={{ color: "grey", fontSize: "1.4rem" }}   >Username</span>
                  <br />
                  <Field name="username" type="text" class = "in"  />
                  {errors.username && touched.username ? (
                    <div style={{color:"red"}}>{errors.username}</div>
                  ) : null}
                </div>
              </div>

              <div className="auth_field_email">
                <div className="email_icon">
                  <MailOutlineIcon fontSize="large" />
                </div>
                <div style={{ width: "100%" }}  className="test_username" >
                  <span style={{ color: "grey", fontSize: "1.4rem" }}  >Email Address</span>
                  <br />
                  <Field name="email" type="email"  class = "in" />
                  {errors.email && touched.email ? <div style={{color:"red"}}>{errors.email}</div> : null}
                </div>
              </div>

              <div className="auth_field_password">
                <div className="password_icon">
                  <LockOutlinedIcon fontSize="large" />
                </div>
                <div style={{ width: "100%" }}  className="test_password_2"  >
                  <div>
                  <span style={{ color: "grey", fontSize: "1.4rem" }}>Password</span>
                  <br />
                  <Field name="password" type={!show ? "password" : "text"}  className = "pass" />
                  {errors.password && touched.password ? (
                    <div style={{color:"red"}}>{errors.password}</div>
                  ) : null}
                  </div>
                  <div>
                  <Button onClick={() => { setShow(!show) }} value={"👁️"} className="view_button" type="button"></Button>
                  </div>
                </div>
              </div>
              <div style={{display:"flex"}}>
              <div>
                <button type="submit"  className="Register_button" onClick={(()=>{setProgress(true);})}>{progress ? <CircularProgress size={20} thickness={4} color="secondary" /> : "Register"}</button>
              </div>
              <div>
                <Button type="button" value="Sign In" className="create_account_button" onClick={()=> props.userHandler("login")}/>
              </div> 
              </div>      
            </Form>
          )}
        </Formik>

      </div>
    </>
  )
}

export default Register;
