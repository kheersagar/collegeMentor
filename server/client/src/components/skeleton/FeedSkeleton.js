import { Avatar, } from '@material-ui/core'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./FeedSkeleton.css";

function FeedSkeleton() {

  const[checkParent,setParent] = useState();
  const ref = useRef();

  useEffect(()=>{
    setParent(ref.current.parentElement.parentElement.className);
  },[]);
  return (
            <div className={`feed_main ${checkParent == "col-2" ? "main2": null} `} ref={ref}>

              <div className="feed_image skeleton">
                <img src={``} width="100%" style={{ minHeight: "100px",borderRadius: "16px" }} />
              </div>
              <div className="feed_title">
                <div className="skeleton skeleton-text"></div>
              </div>
              <input type="checkbox" className="des_checkbox" />
              <div className="feed_description" >
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              </div>
              <div className="header_feed">
                <div className="avatar">
                  <Avatar className="skeleton"/>
                  <div className="feed_username">
                    <div></div>
                    <div className="feed_timestamp"></div>
                  </div>
                </div>
                <div className="feed_footer">
                  <div className="skeleton skeleton-text  skeleton-text-footer">
                  <div className="skeleton skeleton-text skeleton-text-footer" ></div>
                  </div>
                </div>
              </div>
            </div>    
  )
}

export default FeedSkeleton
