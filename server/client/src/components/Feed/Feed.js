import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./Feed.css";
import { MyContext } from "../../App";
import FeedSkeleton from "../skeleton/FeedSkeleton";

function Feed(props) {
  const [post, setPost] = useState([]);
  const [descriptinHeight, setDescriptionHeight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const { postSearch } = useContext(MyContext);
  async function renderPost() {
    try {
      const posts = await axios.request({
        method: "GET",
        url: `/allPost`,
        headers: {
          data: props.headers,
          id: props.id,
          postSearch: postSearch,
          page: page,
          limit: 5,
        },
      });
      const allPost = posts.data;
      if (allPost) setLoading(false);

      if (props.post != true) {
        setPost((prev) => {
          return [...new Set([...prev, allPost])];
        });
      } else {
        setPost((allprev) => {
          return [...new Set([allPost])];
        });
      }
    } catch (e) {
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
    } else if (test_date / 3.6e6 < 60) {
      ts = Math.floor(test_date / 3.6e6) + " hours ago";
    } else if (test_date / 8.64e7 < 24) {
      ts = Math.floor(test_date / 8.64e7) + " days ago";
    } else if (test_date / 2.628e9 < 30) {
      ts = Math.floor(test_date / 2.628e9) + " months ago";
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
    setLoading(true);
    renderPost();
  }, [props.id]);

  if (props.post) {
    renderPost();
  }
  function handleScroll(e) {
    var bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setLoading(true);
      setPage((prev) => prev + 1);
      if (page != 1) {
        setPage(1);
        renderPost();
      }
      bottom = false;
    }
  }

  return (
    <div
      className={`feed_container ${props.class1} ${props.class3}`}
      onScroll={(e) => {
        handleScroll(e);
      }}
    >
      {post ? (
        post.map((posts) => {
          return posts.map((posts) => {
            return (
              <>
                <div
                  className={`feed_main ${props.class2} ${props.size}`}
                  key={posts.timestamp + Math.random()}
                >
                  <div className="feed_image">
                    <img
                      src={`/${posts.image}`}
                      width="100%"
                      style={{
                        maxHeight: "400px",
                        display: posts.image ? "block" : "none",
                        borderRadius: "16px",
                      }}
                    />
                  </div>
                  <div className="feed_title">{posts.Title}</div>
                  <input
                    type="checkbox"
                    className="des_checkbox"
                    id={posts._id}
                  />
                  <div
                    className="feed_description"
                    style={{ height: descriptinHeight }}
                    onClick={() => {
                      heightHandlerd(posts._id);
                    }}
                  >
                    {posts.Description}
                  </div>
                  <div className="header_feed">
                    <div className="avatar">
                      <Avatar />
                      <div className="feed_username">
                        <div>{posts.userId.username}</div>
                        <div className="feed_timestamp">
                          {calculateTimestamp(posts.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="feed_footer">
                      <div className="like">
                        <ThumbUpAltOutlinedIcon fontSize="medium" />{" "}
                        <span className="footer_icon_name"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          });
        })
      ) : 
        <>
          <FeedSkeleton  />
          <FeedSkeleton  />
        </>
      }
      {loading ? (
        <>
          <FeedSkeleton  />
          <FeedSkeleton  />
        </>
      ) : null}
    </div>
  );
}

export default Feed;
