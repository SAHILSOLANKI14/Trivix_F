import React, { useState, useEffect } from "react";
import CustomIcon from "../../shared/Icon";

const LikeButton = ({ posts, postIndex }) => {
  const [likedPosts, setLikedPosts] = useState({});

  const [likesCount, setLikesCount] = useState(
    posts.reduce((acc, post, index) => {
      acc[index] = post.views || 0;
      return acc;
    }, {})
  );

  const handleLikeToggle = (postIndex) => {
    setLikedPosts((prevLiked) => {
      const isCurrentlyLiked = prevLiked[postIndex] || false;
      setLikesCount((prevLikes) => ({
        ...prevLikes,
        [postIndex]: isCurrentlyLiked
          ? prevLikes[postIndex] - 1
          : prevLikes[postIndex] + 1,
      }));

      return {
        ...prevLiked,
        [postIndex]: !isCurrentlyLiked,
      };
    });
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <CustomIcon
        name={`heart ${likedPosts[postIndex] ? "" : "outline"}`}
        style={{
          color: likedPosts[postIndex] ? "red" : "black",
          fontSize: "16px",
        }}
        onClick={() => handleLikeToggle(postIndex)}
      />
      <span>{likesCount[postIndex]}</span>
    </div>
  );
};

export default LikeButton;
