import { React, useState, useEffect, createContext, useRef, useContext } from 'react';
import "./chat.css";
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";



import db from "../Firebase/firebase";
import firebase from "firebase";
import { MyContext } from '../../App';


function Chat(props) {

    const [chatboxheight, setchatboxheight] = useState("3rem");
    const [inputDivDisplay, setinputDivDisplay] = useState("none");
    const [svgName, setSvgName] = useState("up");
    const [chatInput,setChatInput] = useState();
    const [senderId ,setSenderId] = useState();
    const [receiverId,setReceiverId] = useState();
    const [message,setMessage] = useState();
    const sendButton = useRef();
    const {dispatch} = useContext(MyContext)

    console.log("sender",props.loggedInUser.data._id);
    console.log("receiver",props.value._id);



    let chatboxStyles = {
        height: chatboxheight,
        transition: "height 0.4s ease",
    }

    let inputStyle = {
        display: inputDivDisplay,
    }



    function transform() {
        console.log("height", chatboxStyles.height);
        if (chatboxStyles.height == "25rem") {
            setSvgName("down");
            setchatboxheight("3rem");
            setinputDivDisplay("none");
        } else {
            console.log("in here");
            setSvgName("up");
            setchatboxheight("25rem");
            setinputDivDisplay("block");          
        }
    }

    function chatSubmitHandler(e){

        db.collection('messages').add({
            message:chatInput,
            senderID: senderId,
            receiverId:receiverId,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
          });
           setChatInput('');
          
    }
    function chatInputHandler(e){
      console.log(e)
       setChatInput(e.target.value);
       setSenderId(props.loggedInUser.data._id);
       setReceiverId(props.value._id);
    }
    function submitHandler(e){
      e.preventDefault();
      if(chatInput){
        chatSubmitHandler();
      }
      
    }
    useEffect(()=>{
        db.collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>{
          setMessage(snapshot.docs.map((doc)=>{
            return (
              doc.data()
            )
          }))
        } )
        console.log(message);
    },[]);
    return (
    <form onSubmit={submitHandler}>
            <div className="chatbox" style={chatboxStyles}>
              <img src="/images/profile.png" className="profile" />
                <div className="title">
                    <div className="contents">
                        <span>{props.value.username}</span>
                        <button type="button" className="up-btn" onClick={transform}><img src={`/svg/${svgName}.svg`} /></button>
                    </div>
                </div>
                <div style={{textAlign:"right",marginRight:"2px"}}>
                <IconButton>
                  <CloseIcon onClick={()=>{dispatch({type:"close"})}} className="chat_close"></CloseIcon>
                </IconButton>
                </div>
                <hr />
                <div className="content_chat">
                  <ul className="message__ul">
                    { message ? message.map((e)=>{
                      return(
                         (e.senderID == props.loggedInUser.data._id && e.receiverId == props.value._id) || (e.senderID == props.value._id && e.receiverId ==  props.loggedInUser.data._id ) ?
                          <li className={`message__li ${e.senderID == props.loggedInUser.data._id ? "sender__message" : "receiver__message" }`} key={e.senderID+ Math.random() }>{e.message}</li>
                         : null 
                      )
                    }) : null}
                  </ul>
                </div>

                <div className="input-div" style={inputStyle}>
                    <input type="text" className="text-input" value={chatInput} onChange={chatInputHandler}/>
                    <button className="send__button" type="submit">
                      <SendIcon onClick={ chatInput ? chatSubmitHandler : null } style={{marginTop:"20px",color:"blue"}}/>
                    </button>
                </div>
            </div>
    </form>
    )
}

export default Chat;
