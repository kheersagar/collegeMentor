import React, { useContext } from 'react';
import "./UserList.css";
import Avatar from '@material-ui/core/Avatar';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import { MyContext } from '../../App';



function UserList(props) {

  const {allUser,dispatch} = useContext(MyContext);

  const {name,allDetails} = props;
  console.log(allUser);
  return (
   
    <div className="userlist__main" >
      <div onClick={()=>{dispatch({type:"user",value:allDetails})}}>
        <Avatar style={{backgroundColor:"#000014"}} />
      </div>
      <div style={{paddingTop:"5px"}}>{name}</div>
      <div className="user_category">
      {/* Front End Web Developer */}
      </div>
      <div onClick={()=>{dispatch({type:"chat",value:allDetails})}}>
        <MessageOutlinedIcon />
      </div>
    </div>
    
  )
}

export default UserList;
