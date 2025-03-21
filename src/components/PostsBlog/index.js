import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Comment, Header, Image, Transition } from "semantic-ui-react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useWindowSize from "../../hooks/Screen";
import CustomIcon from "../../shared/Icon";
import { theme } from "../../Theme/theme";
import CommentSection from "../Comments";
import LikeButton from "../Like";
import { useDispatch, useSelector } from "react-redux";
import { CommentsByIdRequest } from "../../modules/Home/Actions";

const ImageCarousel = ({ posts, isLaptop, isMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [commentOpen, setCommentOpen] = useState(null);
  const { comments } = useSelector((state) => state.AllPost);
  const size = width < 1450 ? "0px 0px" : "0px 20px";
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
  const handleCommentsFetch = (postId) => {
    dispatch(CommentsByIdRequest(postId));
  };

  const toggleCommentField = (postId) => {
    console.log(postId);
    if (commentOpen === postId) {
      setCommentOpen(null);
    } else {
      handleCommentsFetch(postId);
      setCommentOpen(postId);
    }
  };

  // console.log(postId);
  const handleRedirectUser = (userId) => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };
  const avatar = "https://react.semantic-ui.com/images/avatar/small/matt.jpg";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          padding: size,
          background: "transparent",
        }}
      >
        {posts.map((post, postIndex) => (
          <div
            key={postIndex}
            style={{
              padding: "0px",
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
                padding: "10px 15px",
              }}
            >
              <Comment
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={() => handleRedirectUser(post.ownerDetails?._id)}
              >
                <Image src={post.ownerDetails?.avatar || avatar} avatar />
                <Comment.Content>
                  <Header
                    as={"h5"}
                    style={{ margin: 0, color: theme.colors.white }}
                  >
                    {post?.ownerDetails?.userName}
                  </Header>
                  <Header
                    as={"h5"}
                    style={{
                      margin: 0,
                      fontWeight: "400",
                      color: theme.colors.gray,
                    }}
                  >
                    {post.location}
                  </Header>
                </Comment.Content>
              </Comment>
              <CustomIcon
                name="ellipsis vertical"
                style={{ color: theme.colors.white }}
              />
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
                padding: "10px 15px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <LikeButton posts={posts} postIndex={postIndex} />
                <CustomIcon
                  name="chat outline"
                  style={{ color: theme.colors.white, fontSize: "16px" }}
                  onClick={() => toggleCommentField(post._id)}
                />
              </div>
              <CustomIcon
                name="send outline"
                style={{ color: theme.colors.black, fontSize: "16px" }}
              />
            </div>
            <div style={{ padding: "5px 20px" }}>
              <Header as={"h4"} style={{ color: theme.colors.gray }}>
                {post.caption}
              </Header>
            </div>

            {/* Comments Section */}
            <Transition
              visible={commentOpen === post._id}
              animation="scale"
              duration={300}
            >
              <div>
                {commentOpen === post._id && (
                  <CommentSection
                    comments={comments[post._id] || []}
                    postId={post._id}
                  />
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
