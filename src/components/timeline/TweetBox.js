import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";
import "./TweetBox.css";

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sentTweet = (e) => {
    e.preventDefault();

    addDoc(collection(db, "posts"), {
      displayName: "test displayName",
      userName: "test userName",
      verified: true,
      text: tweetMessage,
      avatar: "http://shincode.info/wp-content/uploads/2021/12/icon.png",
      image: tweetImage,
      timestamp: serverTimestamp(),
    });
    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox--input">
          <Avatar />
          <input
            value={tweetMessage}
            placeholder="今どうしてる？"
            type="text"
            onChange={(e) => setTweetMessage(e.target.value)}
          ></input>
        </div>
        <input
          value={tweetMessage}
          className="tweetBox--imageInput"
          placeholder="画像のURLを入力してください"
          type="text"
          onChange={(e) => setTweetImage(e.target.value)}
        ></input>
        <Button
          className="tweetBox--tweetButton"
          type="submit"
          onClick={sentTweet}
        >
          ツイートする
        </Button>
      </form>
    </div>
  );
};

export default TweetBox;
