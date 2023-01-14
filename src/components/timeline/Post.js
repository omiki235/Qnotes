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

const Post = ({ displayName, userName, verified, text, avatar, image }) => {
  return (
    <div className="post">
      <div className="post--avatar">
        <Avatar src={avatar} />
      </div>
      <div className="post--body">
        <div className="post--header">
          <div className="post--headerText">
            <h3>{displayName}</h3>
            <VerifiedUser className="post--badge" />
            <span className="post--headerSpecial">@{userName}</span>
          </div>
          <div className="post--headerDescription">
            <p>{text}</p>
          </div>
        </div>
        <img src={image} alt="img" />
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
