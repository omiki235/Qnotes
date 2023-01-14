import React from "react";
import { Search } from "@mui/icons-material";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import "./Widgets.css";

const Widgets = () => {
  return (
    <div className="widgets">
      <div className="widgets--input">
        <Search className="widgets--searchIcon" />
        <input placeholder="キーワード検索" type="text" />
      </div>
      <div className="widgets--widgetContainer">
        <h2>いまどうしてる？</h2>
        <TwitterTweetEmbed tweetId={""} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="omikey005"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          url={"https://twitter.com/"}
          options={{ text: "#React.js勉強中", via: "omikey005" }}
        />
      </div>
    </div>
  );
};

export default Widgets;
