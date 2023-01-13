import React from "react";
import Post from "./Post";
import TweetBox from "./TweetBox";
import "./Timeline.css";

const Timeline = () => {
  return (
    <div className="timeline">
      <div className="timeline--header">
        <h2>ホーム</h2>
      </div>
      <TweetBox />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Timeline;
