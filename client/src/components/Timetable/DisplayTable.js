import axios from 'axios';
import React,{useEffect, useState,useRef} from 'react';

function abc(count,props,tableDeleteHandler){
  console.log("abc called",count,props)
  return(
    <>
        {count == null  || count == undefined ? console.log("hello") : count.reverse().map((e)=>{
              return(
  
        <div className="timetable_main">
        <div className="timetable" >
            <div className="row">
              <div className="table_time_heading final_table_heading">DAY/Time</div>
              
              {Object.values(e.time)==null || Object.values(e.time)==undefined ? null : Object.values(e.time).map((res)=>{
                return(
                  <div  className="time_heading time_field final_display_time"> {res}</div>
                )
              }) }
              
            </div>
            {props.day.map((day)=>{
                return(
                  <div className="row"> 
                  <div className="table_heading final_table_heading">{day}</div>
                  { day == "MONDAY" ? e.monday_class === null || e.monday_class === undefined ? null :
                    Object.values(e.monday_class).map((m_class)=>{
                    return(
                      <div className="subject_field s "> {m_class} </div>
                    )
                  }) 
                  : day == "TUESDAY" ? e.tuesday_class === null || e.tuesday_class === undefined ? null :
                  Object.values(e.tuesday_class).map((m_class)=>{
                    return(
                      <div className="subject_field s"> {m_class} </div>
                    )
                  })
                  : day == "WEDNESDAY" ? e.wednesday_class === null || e.wednesday_class === undefined ? null :
                  Object.values(e.wednesday_class).map((m_class)=>{
                    return(
                      <div className="subject_field s"> {m_class} </div>
                    )
                  }) : day =="THRUSDAY" ? e.thrusday_class === null || e.thrusday_class === undefined ? null :
                  Object.values(e.thrusday_class).map((m_class)=>{
                    return(
                      <div className="subject_field s"> {m_class} </div>
                    )
                  }) : day == "FRIDAY" ? e.friday_class === null || e.friday_class === undefined ? null :
                  Object.values(e.friday_class).map((m_class)=>{
                    return(
                      <div className="subject_field s"> {m_class} </div>
                    )
                  }) :day=="SATURDAY" ? e.saturday_class === null || e.saturday_class === undefined ? null :
                  Object.values(e.saturday_class).map((m_class)=>{
                    return(
                      <div className="subject_field s"> {m_class} </div>
                    )
                  }) :null
                  }
                  </div>
                )
              })}
            
            </div>
            <button className="table_form_delete" value={e._id} onClick={tableDeleteHandler}>Delete</button>
        </div>
            )})}
    </>
  )
}

function DisplayTable(props) {

  const [count,setCount] = useState();
  const [response,setResponse] = useState();

  async function tableCall(){
    try{
     const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-table`);
    setCount(result.data)  
   
    console.log("result",Object.values(result.data) )
    console.log(result)
    }
    catch(e){
      console.log(e);
    }
  }


  async function tableDeleteHandler(e){

    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-table/${e.target.value}`);
    console.log("response",res);
    setResponse(res.data);
  }

  useEffect(()=>{
    tableCall();
    // abc(count,props,tableDeleteHandler);
    console.log("useEffect callled");
    setResponse("");
  },[response === "deleted successfully!!"]) 
    return (
        <>   
        {abc(count,props,tableDeleteHandler)}
        </>
    )
}

export default DisplayTable;
