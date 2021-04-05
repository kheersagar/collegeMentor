import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import axios from 'axios';
import "./Timetable.css";
import DisplayTable from "./DisplayTable";

function Timetable(props) {

  const [isTable,setIsTable]= useState(true);
  const [filled,setFilled] = useState(false);
  const [isDropdown,setIsDropdown] = useState(true);
  const [inputId,setInputId] = useState();
  const [isHover,setHoverHandler] = useState(false);
  const [isActiveLi,setIsActiveLi] = useState();
  const [liValue,setLiValue] = useState({
    key : "",
    value: ""
  });
  const [isPosition,setIsPosition] = useState(true);

  async function tableSubmitHandler(values){
    console.log(values)
    if(values.t1 != "" && values.t2 != ""){
      setIsTable(false);
      await axios.post("http://localhost:8080/time",{values});
    }else{
      alert("Empty!!");
      return false;
    }
    
  }

  const day = ["MONDAY","TUESDAY","WEDNESDAY","THRUSDAY","FRIDAY","SATURDAY"];
  const count = ["t1","t2","t3","t4","t5","t6","t7","t8","t9","t10",];
  const monday_class = ["m1","m2","m3","m4","m5","m6","m7","m8","m9","m10",];
  const tuesday_class = ["tu1","tu2","tu3","tu4","tu5","tu6","tu7","tu8","tu9","tu10"];
  const wednesday_class = ["w1","w2","w3","w4","w5","w6","w7","w8","w9","w10",];
  const thrusday_class = ["th1","th2","th3","th4","th5","th6","th7","th8","th9","th10",];
  const friday_class = ["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10",];
  const saturday_class = ["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10",];
  
function onChangeHandler(event,id){
  setIsDropdown(true);
  setInputId(id);
  setIsPosition(id)
  console.log(id);
}

const options = [
  {
    key: "1",
    value : "maths"
  },
  {
    key: "2",
    value : "physics"
  },
  {
    key: "3",
    value : "chemistry"
  },
  {
    key:"4" ,
    value : "python"
  },
  {
    key: "5",
    value : "c"
  },
  {
    key: "6" ,
    value : "data structure"
  }
];

function mouseEnterHandler(key){
  setHoverHandler(true)
  setIsActiveLi(key);
  console.log(key)
}

function mouseLeaveHandler(key){
  setHoverHandler(false)
  setIsActiveLi(key)
}

function liClickHandler(val,text,setFieldValue){
  setLiValue({key:val , value : text});
  setIsPosition(true);
  setIsDropdown(false);
  setFieldValue(val,text)
}
  useEffect(()=>{
  
  },[liValue.value])
  return (
    <>
    <Formik 
    initialValues={{
        t1:'',
        t2:''
      }}
      onSubmit={values =>{
       tableSubmitHandler(values) ;
       console.log(values);
       
      }}
      >
       {({  setFieldValue }) => (
        <Form>
    <div className="timetable_main" style={{display: isTable ? props.display ? "block" :"none" : "none"}}>
      
        <div className="timetable"  >
        <div className="row">
        <div className="table_time_heading final_table_heading">Day/Time</div>
        {count.map((e)=>{
          return(
            <>
            <div className="time_heading"> 
            <Field name={e} type="time" className="time_field"  /> 
            </div>
            
            </>
          )
        })}
        </div>
        {day.map((day)=>{
          return(
            <div className="row">
            <div className="table_heading final_table_heading">{day}</div>
            {day=="MONDAY"?
            monday_class.map((val)=>{
              return(
              <div style={{position: isPosition == val ? "relative" : null }}>
              <Field name={val}  type="text" className="subject_field  s"  onClick={(event)=>{onChangeHandler(event,val)}}  />
                <div style={{position:"absolute",left:"10%",display: isDropdown ? inputId === val ? "block":"none" : "none"}}>
                  <ul className="table_ul">
                  {props.details.map((item)=>{
                    return(
                    <li key ={item.sub} id={val} className="table_li" style={{ opacity: isHover ? item.sub == isActiveLi ? "0.7":null : null}} onMouseEnter={ ()=>{ mouseEnterHandler(item.sub) }  } onMouseLeave={ ()=>{ mouseLeaveHandler(item.sub)} } onClick={()=>{liClickHandler(val,item.sub,setFieldValue)}}>{item.sub}</li>
                  )})}
                  </ul>
                </div>
              </div>
            )})
            : day=="TUESDAY" ?
            tuesday_class.map((val)=>{
              return(
              <div  style={{position: isPosition == val ? "relative" : null}}>
              <Field name={val} type="text" className="subject_field s" onClick={(event)=>{onChangeHandler(event,val)}} />
              <div style={{position:"absolute",left:"10%",display: isDropdown ? inputId === val ? "block":"none" : "none"}}>
                  <ul className="table_ul">
                  {props.details.map((item)=>{
                    return(
                    <li key ={item.sub} id={val} className="table_li" style={{ opacity: isHover ? item.sub == isActiveLi ? "0.7":null : null, borderRadius:"5px"}} onMouseEnter={ ()=>{ mouseEnterHandler(item.sub) }  } onMouseLeave={ ()=>{ mouseLeaveHandler(item.sub)} } onClick={()=>{ liClickHandler(val,item.sub,setFieldValue)  }}>{item.sub}</li>
                  )})}
                  </ul>
                </div>
              </div>
            )})
            :day=="WEDNESDAY" ?
            wednesday_class.map((val)=>{
              return(
              <div style={{position: isPosition == val ? "relative" : null}}>
              <Field name={val} type="text" className="subject_field s" onClick={(event)=>{onChangeHandler(event,val)}} />
              <div style={{position:"absolute",left:"10%",display: isDropdown ? inputId === val ? "block":"none" : "none"}}>
                  <ul className="table_ul">
                  {props.details.map((item)=>{
                    return(
                    <li key ={item.sub} id={val} className="table_li" style={{ opacity: isHover ? item.sub == isActiveLi ? "0.7":null : null, borderRadius:"5px"}} onMouseEnter={ ()=>{ mouseEnterHandler(item.sub) }  } onMouseLeave={ ()=>{ mouseLeaveHandler(item.sub)} } onClick={()=>{ liClickHandler(val,item.sub,setFieldValue)  }}>{item.sub}</li>
                  )})}
                  </ul>
                </div>
              </div>
            )})
            :day=="THRUSDAY" ?
            thrusday_class.map((val)=>{
              return(
              <div style={{position: isPosition == val ? "relative" : null}}><Field name={val} type="text" className="subject_field s" onClick={(event)=>{onChangeHandler(event,val)}} />
              <div style={{position:"absolute",left:"10%",display: isDropdown ? inputId === val ? "block":"none" : "none"}}>
                  <ul className="table_ul">
                  {props.details.map((item)=>{
                    return(
                    <li key ={item.sub} id={val} className="table_li" style={{ opacity: isHover ? item.sub == isActiveLi ? "0.7":null : null, borderRadius:"5px"}} onMouseEnter={ ()=>{ mouseEnterHandler(item.sub) }  } onMouseLeave={ ()=>{ mouseLeaveHandler(item.sub)} } onClick={()=>{ liClickHandler(val,item.sub,setFieldValue)  }}>{item.sub}</li>
                  )})}
                  </ul>
                </div>
              </div>
            )})
            :day=="FRIDAY" ?
            friday_class.map((val)=>{
              return(
              <div style={{position: isPosition == val ? "relative" : null}}><Field name={val} type="text" className="subject_field s"  onClick={(event)=>{onChangeHandler(event,val)}} value={ val == liValue.key ? liValue.value : null}/>
              <div style={{position:"absolute",left:"10%",display: isDropdown ? inputId === val ? "block":"none" : "none"}}>
                  <ul className="table_ul">
                  {props.details.map((item)=>{
                    return(
                    <li key ={item.sub} id={val} className="table_li" style={{ opacity: isHover ? item.sub == isActiveLi ? "0.7":null : null, borderRadius:"5px"}} onMouseEnter={ ()=>{ mouseEnterHandler(item.sub) }  } onMouseLeave={ ()=>{ mouseLeaveHandler(item.sub)} } onClick={()=>{ liClickHandler(val,item.sub,setFieldValue)  }}>{item.sub}</li>
                  )})}
                  </ul>
                </div>
              </div>
            )}):
            day=="SATURDAY" ?
            saturday_class.map((val)=>{
              return(
              <div style={{position: isPosition == val ? "relative" : null}}><Field name={val} type="text" className="subject_field s" onClick={(event)=>{onChangeHandler(event,val)}} value={ val == liValue.key ? liValue.value : null}/>
              <div style={{position:"absolute",left:"10%",display: isDropdown ? inputId === val ? "block":"none" : "none"}}>
                  <ul className="table_ul">
                  {props.details.map((item)=>{
                    return(
                    <li key ={item.sub} id={val} className="table_li" style={{ opacity: isHover ? item.sub == isActiveLi ? "0.7":null : null, borderRadius:"5px"}} onMouseEnter={ ()=>{ mouseEnterHandler(item.sub) }  } onMouseLeave={ ()=>{ mouseLeaveHandler(item.sub)} } onClick={()=>{ liClickHandler(val,item.sub,setFieldValue)  }}>{item.sub}</li>
                  )})}
                  </ul>
                </div>
              </div>
            )}):
              null
            }
            
             </div>
          )
        })}
          
          
        </div>
        
      
    </div>
    {
      isTable ? props.display ? <button type="submit" className="table_form_submit" >Submit table</button> :null :null
    }
    
    </Form>
       )}
      </Formik>
    {!isTable ? <DisplayTable day={day} />: null }
    </>
  )
}

export default Timetable;
