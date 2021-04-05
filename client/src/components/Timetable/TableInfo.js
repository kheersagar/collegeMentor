import React, { useEffect, useState } from 'react';
import "./Timetable.css";
import Timetable from "./Timetable";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';

function TableInfo() {
  const [options,setOptions] = useState([]);
  const [isSubject,setIsSubject] = useState('');
  const [isProfName,setIsProfName] = useState('');
  const [isTimeTable,setIsTimeTable] = useState(false);

  function renderList(){
    return(
      <>
      <div className="info_content">
        <div>
          <div className="info_content_heading">Name</div>
          {options.map((e)=>{
        return(
          <li className="info_table_li"><span> {e.sub}</span></li>
            )
          })}
      </div>
    <div>
      <div className="info_content_heading">Prof</div>
      {options.map((e)=>{
        return(
          <li className="info_table_li"><span> {e.prof}</span></li>
            )
          })}
    </div>
      </div>
    </>
    )}

  function checkFun(){
    setIsTimeTable(true)
  }
let date = new Date();
useEffect(()=>{
  // renderList();
},[options.length])
  return (
    <>
    <div className="table_info_main" style={{display:isTimeTable ? "none":"block"}}>
    <div className="table_menu_main">
      <div className="info_heading">Create Timetable</div>
      <div className="info_date">{date.toDateString()}</div>
    </div>
      <div className="info_input"> 
          <input type="text" placeholder="Subject name" onChange={(e)=>{setIsSubject(e.target.value)}} value={isSubject}/> 
          <input type="text" placeholder="Profs. name" onChange={(e)=>{setIsProfName(e.target.value)}} value={isProfName}/>
          <IconButton >
        <AddCircleIcon style={{color:"red",fontSize:"4rem"}} onClick={()=>{
          if(isSubject){
            if(isProfName){
              options.push({sub:isSubject,prof:isProfName})
            }
          }
          
          console.log(options)
          setIsProfName('')
          setIsSubject('')}}/>
        </IconButton>
     </div>     
    <div>
      {renderList()}
    </div>
    <Button color="secondary" variant="outlined" onClick={checkFun} disabled={options.length > 0 ? "" : "disabled"}>Next</Button>
    </div>
    <Timetable display={isTimeTable} details={options}/>
    </>
  )
}

export default TableInfo
