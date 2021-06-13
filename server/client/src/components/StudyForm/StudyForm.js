import React, { useState } from 'react';
import "./StudyForm.css";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

function StudyForm() {
  const [file,setFile] = useState();
  const [file2,setFile2] = useState();
  const [file3,setFile3] = useState();
  const [file4,setFile4] = useState();
  const [file5,setFile5] = useState();
  const [file6,setFile6] = useState();
  const [alert,setAlert] = useState(false);
  const [isProgress,setIsProgress] = useState(false);

  async function formSubmit(values){
    setIsProgress(true);
    try{
    const formData = new FormData(); 
    formData.append("code",values.code);
    formData.append("sub1",values.sub1);
    formData.append("sub2",values.sub2);
    formData.append("sub3",values.sub3);
    formData.append("sub4",values.sub4);
    formData.append("sub5",values.sub5);
    formData.append("sub6",values.sub6);
    formData.append('file1',file);
    formData.append('file2',file2);
    formData.append('file3',file3);
    formData.append('file4',file4);
    formData.append('file5',file5);
    formData.append('file6',file6);

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/studyMaterial`,formData);
    if(res.data.status == "updated"){
      setIsProgress(false);
      setAlert(true);
      setTimeout(()=>{
        setAlert(false);
      },3000);
    }
    }catch(e){
      console.log(e)
    }
    console.log(values)
  }

  const formSchema = Yup.object().shape({
    sub1: Yup.string()
      .required("This field is required"),
    sub2: Yup.string()
      .required("This field is required"),
    sub3: Yup.string()
      .required("This field is required"),  
    sub4: Yup.string()
      .required("This field is required"),
    sub5: Yup.string()
      .required("This field is required"),
    sub6: Yup.string()
      .required("This field is required"),
  });

  

  return (
    <div>
    <Formik 
    initialValues={{
      sub1:""
    }}
    validationSchema={formSchema}
    onSubmit={values => {
      formSubmit(values)
    }}
    >
    {({ errors, touched }) => (
        <Form >
       
          <div className="study_form_main">
          <MuiAlert elevation={6} variant="filled"  style={{position:"fixed",top:"12vh",zIndex:"1000",display: alert ? "flex" : "none"}}> successfully Registered</MuiAlert>
            <div className="study_form_main_heading">
              Study informmation
            </div>
            <div className="first_form">
              <div>
             <span className="subject"> Subject code: </span>
              <Field name="code" as="select" className="selct_field">
              <option value="select">select</option>
                <option value="sem01">FIRST SEMESTER</option>
                <option value="sem02">SECOND SEMESTER</option>

                <option value="cse23">CSE - (THIRD SEMESTER)</option>
                <option value="mech23">MECH - (THIRD SEMESTER)</option>
                <option value="civil23">CIVIL - (THIRD SEMESTER)</option>
                <option value="meta23">META - (THIRD SEMESTER)</option>
                <option value="eee23">EEE - (THIRD SEMESTER)</option>

                <option value="cse24">CSE - (FOURTH SEMESTER)</option>
                <option value="mech24">MECH - (FOURTH SEMESTER)</option>
                <option value="civil24">CIVIL - (FOURTH SEMESTER)</option>
                <option value="meta24">META - (FOURTH SEMESTER)</option>
                <option value="eee24">EEE - (FOURTH SEMESTER)</option>

                <option value="cse35">CSE - (FIFTH SEMESTER)</option>
                <option value="mech35">MECH - (FIFTH SEMESTER)</option>
                <option value="civil35">CIVIL - (FIFTH SEMESTER)</option>
                <option value="meta35">META - (FIFTH SEMESTER)</option>
                <option value="eee35">EEE - (FIFTH SEMESTER)</option>

                <option value="cse36">CSE - (SIXTH SEMESTER)</option>
                <option value="mech36">MECH - (SIXTH SEMESTER)</option>
                <option value="civil36">CIVIL - (SIXTH SEMESTER)</option>
                <option value="meta36">META - (SIXTH SEMESTER)</option>
                <option value="eee36">EEE - (SIXTH SEMESTER)</option>

                <option value="cse47">CSE - (SEVENTH SEMESTER)</option>
                <option value="mech47">MECH - (SEVENTH SEMESTER)</option>
                <option value="civil47">CIVIL - (SEVENTH SEMESTER)</option>
                <option value="meta47">META - (SEVENTH SEMESTER)</option>
                <option value="eee47">EEE - (SEVENTH SEMESTER)</option>

                <option value="cse48">CSE - (EIGTH SEMESTER)</option>
                <option value="mech48">MECH - (EIGTH SEMESTER)</option>
                <option value="civil48">CIVIL - (EIGTH SEMESTER)</option>
                <option value="meta48">META - (EIGTH SEMESTER)</option>
                <option value="eee48">EEE - (EIGTH SEMESTER)</option>
              </Field>
              </div>
                <div className="second_row">
                      <div>
                        <Field placeholder="Enter subject " name= "sub1" type="text" />
                        <input type="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
                          {errors.sub1 && touched.sub1 ? (
                            <div className="form_error">{errors.sub1}</div>
                          ) : null}
                      </div>
                      <div>
                        <Field placeholder="Enter subject " name= "sub2"type="text" />
                        <input type="file" onChange={(e)=>{setFile2(e.target.files[0])}}/>
                        {errors.sub2 && touched.sub2 ? (
                            <div className="form_error">{errors.sub2}</div>
                          ) : null}
                      </div>
                      <div>
                        <Field placeholder="Enter subject " name= "sub3" type="text"/>
                        <input type="file" onChange={(e)=>{setFile3(e.target.files[0])}}/>
                        {errors.sub3 && touched.sub3 ? (
                            <div className="form_error">{errors.sub3}</div>
                          ) : null}
                      </div>
                      <div>
                        <Field placeholder="Enter subject " name= "sub4" type="text"/>
                        <input type="file" onChange={(e)=>{setFile4(e.target.files[0])}}/>
                        {errors.sub4 && touched.sub4 ? (
                            <div className="form_error">{errors.sub4}</div>
                          ) : null}
                      </div>
                      <div>
                        <Field placeholder="Enter subject " name= "sub5" type="text"/>
                        <input type="file" onChange={(e)=>{setFile5(e.target.files[0])}}/>
                        {errors.sub5 && touched.sub5 ? (
                            <div className="form_error">{errors.sub5}</div>
                          ) : null}
                      </div>
                      <div>
                        <Field placeholder="Enter subject " name= "sub6" type="text"/>
                        <input type="file" onChange={(e)=>{setFile6(e.target.files[0])}}/>
                        {errors.sub6 && touched.sub6 ? (
                            <div className="form_error">{errors.sub6}</div>
                          ) : null}
                      </div>
                  </div>    
            </div>
            <button type="submit" className="form_submit" > {isProgress ? <CircularProgress size={20} thickness={4} color="secondary" /> : "submit"}</button>
          </div>
         
        </Form>
    )}
        </Formik>
    </div>
  )
}

export default StudyForm;
