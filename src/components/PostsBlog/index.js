import React, { useState } from "react";
import { Comment, Header, Image, Transition } from "semantic-ui-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomIcon from "../../shared/Icon";
import CommentSection from "../Comments";
import { theme } from "../../Theme/theme";
import LikeButton from "../Like";

const ImageCarousel = ({ posts, isLaptop, isMobile }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <ul style={{ padding: 0, margin: 0 }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className="custom-dot"
        style={{
          width: "8px",
          height: "8px",
          background: "gray",
          borderRadius: "50%",
          transition: "0.4s ease",
        }}
      />
    ),
  };

  const responsiveHeight = () => {
    if (isLaptop) return "350px";
    if (isMobile) return "300px";
    else {
      return "500px";
    }
  };
  const [commentOpen, setCommentOpen] = useState(null);

  const toggleCommentField = (postId) => {
    if (commentOpen === postId) {
      setTimeout(() => setCommentOpen(null), 300);
    } else {
      setCommentOpen(postId);
    }
  };
  const avatar = "https://react.semantic-ui.com/images/avatar/small/matt.jpg";
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {posts.map((post, postIndex) => (
          <div
            key={postIndex}
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            {/* User Info and Comments */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "10px",
              }}
            >
              <Comment
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Image src={avatar || post.ownerDetails?.avatar} avatar />
                <Comment.Content>
                  <Header as={"h5"} style={{ margin: 0 }}>
                    {post?.ownerDetails?.userName}
                  </Header>
                  <Header
                    as={"h5"}
                    style={{
                      margin: 0,
                      fontWeight: "400",
                      color: theme.colors.subtext,
                    }}
                  >
                    {post.caption}
                  </Header>
                </Comment.Content>
              </Comment>
              <CustomIcon name="ellipsis vertical" />
            </div>

            {Array.isArray(post.image) && post.image.length > 1 ? (
              <Slider {...settings}>
                {post.image.map((src, index) => (
                  <div key={index} style={{ marginBottom: "20px !important" }}>
                    <Image
                      src={src}
                      alt={`slide-${index}`}
                      style={{
                        width: "100%",
                        height: responsiveHeight(),
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <Image
                src={Array.isArray(post.image) ? post.image[0] : post.image}
                alt="single-image"
                style={{
                  width: "100%",
                  height: responsiveHeight(),
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
            )}

            {/* Action Icons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <LikeButton posts={posts} postIndex={postIndex} />
                <CustomIcon
                  name="chat outline"
                  style={{ color: "black", fontSize: "16px" }}
                  onClick={() => toggleCommentField(postIndex)}
                />
              </div>
              <CustomIcon
                name="send outline"
                style={{ color: "black", fontSize: "16px" }}
              />
            </div>
            <div style={{ padding: "5px 10px" }}>
              <Header as={"h4"}>{post.caption}</Header>
            </div>

            {/* Comments Section */}
            <Transition
              visible={commentOpen === postIndex}
              animation="scale"
              duration={300}
            >
              <div>
                {commentOpen === postIndex && (
                  <CommentSection comments={post.comments} />
                )}
              </div>
            </Transition>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
