import React, { useState, useEffect } from 'react';
import axios from "axios";
import Button from '../Button/Button';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MobileScreenShareOutlinedIcon from '@material-ui/icons/MobileScreenShareOutlined';
import LanguageIcon from '@material-ui/icons/Language';
import "./Feed.css";


function Feed(props) {
    const [post,setPost] = useState([]);
    const [feedUserDetails,setFeedUserDetails] = useState();
    const [descriptinHeight,setDescriptionHeight] = useState(false);
    async function renderPost(){
        try{
            const posts = await axios.request({
                method:"GET",
                url:"http://localhost:8080/allPost",
                headers: { 'data': props.headers }
            })
            console.log(posts)
            const allPost = posts.data;
            setPost(allPost);     
           }
           catch(e){
               console.log(e);
           }
    
  }

  function calculateTimestamp(time) {
    const post_time = new Date(time);
    const current_time = new Date();
    const test_date = Math.abs(current_time - post_time);
    let ts = "just now";
    if (test_date / 1000 < 60) {
      ts = "just now";
    } else if (test_date / 60000 < 60) {
      ts = Math.floor(test_date / 60000) + " mins ago";
    } else if (test_date / 3.6e+6 < 60) {
      ts = Math.floor(test_date / 3.6e+6) + " hours ago";
    } else if (test_date / 8.64e+7 < 24) {
      ts = Math.floor(test_date / 8.64e+7) + " days ago";
    } else if (test_date / 2.628e+9 < 30) {
      ts = Math.floor(test_date / 2.628e+9) + " months ago";
    } else if (test_date / 31535965440.0381851 < 12) {
      ts = Math.floor(test_date / 31535965440.0381851) + " years ago";
    }
    return ts;
  }

  function heightHandlerd(id) {

    var x = document.getElementById(id).click();
    console.log(x);
  }
  useEffect(() => {
    renderPost()
  }, [])
  if(props.post){
    renderPost();
  }
  const currentTime = new Date().toLocaleTimeString();
  return (
    <div className={`feed_container ${props.class1}`}>
      {post.reverse().map((posts) => {
        return (
          <>

            <div className={`feed_main ${props.class2}`}>

              <div className="feed_image">
                <img src={`http://localhost:8080/${posts.image}`} width="100%" style={{ maxHeight: "700px", display: posts.image ? "block" : "none", borderRadius: "16px" }} />
              </div>
              <div className="feed_title">{posts.Title}</div>
              <input type="checkbox" className="des_checkbox" id={posts._id}/>
              <div className="feed_description" style={{ height: descriptinHeight }} onClick={()=>{heightHandlerd(posts._id)}}  key={posts._id}>{posts.Description}</div>
              <div className="header_feed">
                <div className="avatar">
                  <Avatar />
                  <div className="feed_username">
                    <div>{posts.userId.username}</div>
                    <div className="feed_timestamp">{calculateTimestamp(posts.timestamp)}</div>
                  </div>
                </div>
                <div className="feed_footer">
                  <div className="like"><ThumbUpAltOutlinedIcon fontSize="medium" /> <span className="footer_icon_name">Like</span></div>
                  <div className="comment"><ChatBubbleOutlineIcon fontSize="medium" /><span className="footer_icon_name">Comment</span></div>
                </div>
              </div>
            </div>
          </>
        )
      })}
    </div>
  );
{/* <LanguageIcon style={{ fontSize: "24px", color: "#4a47a3", paddingTop: "7px" }} /> */}
}

export default Feed;


