import React from "react";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  PublishOutlined,
  Repeat,
  VerifiedUser,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "./Post.css";

const Post = () => {
  return (
    <div className="post">
      <div className="post--avatar">
        <Avatar />
      </div>
      <div className="post--body">
        <div className="post--header">
          <div className="post--headerText">
            <h3>プログラミング</h3>
            <VerifiedUser className="post--badge" />
            <span className="post--headerSpecial">@omikey005</span>
          </div>
          <div className="post--headerDescription">
            <p>テストツイート</p>
          </div>
        </div>
        <img src="https://source.unsplash.com/random" alt="" />
        <div className="post--footer">
          <ChatBubbleOutline fontSize="small" />
          <Repeat fontSize="small" />
          <FavoriteBorder fontSize="small" />
          <PublishOutlined fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default Post;
