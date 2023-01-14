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
      <Post
        displayName="プログラミング"
        userName="omikey"
        verified={true}
        text="Test Text"
        avatar="http://shincode.info/wp-content/uploads/2021/12/icon.png"
        image="https://source.unsplash.com/random"
      />
    </div>
  );
};

export default Timeline;
