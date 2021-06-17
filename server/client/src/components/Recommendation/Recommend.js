import React, { useContext, useEffect, useState } from 'react';
import "./Recommend.css";
import Avatar from '@material-ui/core/Avatar';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';

import { MyContext } from '../../App';
import axios from 'axios';

function Recommend(props){

  const [recommendation,setRecommendation] = useState();
  const {allUser,dispatch,userData} = useContext(MyContext);
  let filtered;
  useEffect(()=>{
  axios.post(`/recommend`).then((recomm)=>{
    var rec = [];
    recomm.data.user.map((e)=>{
      rec.push(e);
    });
    let ids = rec.map(o => o._id)
    filtered = rec.filter(({_id}, index) => !ids.includes(_id, index + 1))   //remove duplicates objects from array
    setRecommendation(filtered);
  });
  },[]);
    
    return (

        <div>
            <fieldset className="Recommendation_box" style={{display: recommendation? window.innerWidth > 640 ? "block" :null :"none"}}>
                <legend className="R_Name">Recommendation</legend>
                {recommendation ? recommendation.map((e)=>{
                  return(
                        (e._id) != userData.data._id ?   //logged in user recommendation should restricted
                     <div className="line" key={e._id}>
                      <div className="recomm__user__image" onClick={()=>{dispatch({type:"user",value:e})}}>
                        <Avatar />
                      </div>
                      <div className="recomm__username"  onClick={()=>{dispatch({type:"user",value:e})}}>
                        {e.username}
                      </div>
                      <div onClick={()=>{dispatch({type:"chat",value:e})}} className="message">
                        <MessageOutlinedIcon/>
                      </div>
                     </div>
                    : null 
                  )
                }) : null }
            </fieldset>
       </div>
    )
}

export default Recommend;