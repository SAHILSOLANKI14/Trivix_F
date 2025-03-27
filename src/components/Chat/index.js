import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Comment, Input, Segment } from "semantic-ui-react";
import { Button } from "../../shared";
import {
  CreatTweetsRequest,
  getAllTweetsRequest,
} from "../../modules/Profile/Actions";
import { theme } from "../../Theme/theme";
import CustomIcon from "../../shared/Icon";
import EmojiPicker from "emoji-picker-react";
import useWindowSize from "../../hooks/Screen";
import Loader from "../../utility/Loader";

const PostBox = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGif, setSelectedGif] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [page, setPage] = useState(1);
  const isMobile = width < 770;
  const istablet = width < 1030;
  const tweetsContainerRef = useRef(null);

  const { AllTWeetData, hasMore, loading } = useSelector(
    (state) => state?.AllTweet
  );
  const tweets = AllTWeetData?.tweets || [];
  const limit = 30;
  const sort = "desc";

  useEffect(() => {
    dispatch(getAllTweetsRequest(page, limit, sort));
  }, [dispatch, page, limit, sort]);

  useEffect(() => {
    const container = tweetsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (loading || !hasMore) return;
      if (container.scrollTop === 0) {
        console.log("Fetching older tweets...");
        setPage((prevPage) => prevPage + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Handle new tweet submission
  const handleSend = () => {
    if (input.trim() === "" && !selectedImage && !selectedGif) return;

    const data = {
      content: input,
      image: selectedImage,
      gif: selectedGif,
    };

    dispatch(CreatTweetsRequest(data));
    setInput("");
    setSelectedImage(null);
    setSelectedGif(null);
    setShowEmojiPicker(false);

    setTimeout(() => {
      setPage(1);
      dispatch(getAllTweetsRequest(1, limit, sort));
    }, 1000);
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Segment
      style={{
        height: isMobile || istablet ? "90vh" : "90vh",
        display: "flex",
        flexDirection: "column",
        background: theme.colors.mainbg,
        borderRadius: isMobile ? "0px" : "15px",
        marginLeft: isMobile ? "0px" : "15px",
        padding: 0,
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {isMobile || istablet ? (
            <div
              style={{
                position: "sticky",
                top: 0,
                left: 0,
                background: theme.colors.main,
                zIndex: 1000,
                marginTop: "-20px",
                width: "100%",
                padding: "10px 10px ",
                marginBottom: "20px",
              }}
            >
              <CustomIcon
                name={"arrow left"}
                size={"large"}
                style={{ color: theme.colors.white }}
                onClick={handleNavigate}
              />
            </div>
          ) : null}
          <div
            ref={tweetsContainerRef}
            style={{
              flex: 1,
              overflowY: "auto",
              paddingRight: "10px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Comment.Group
              style={{
                padding: "10px",
                paddingBottom: "70px",
              }}
            >
              {tweets.map((msg) => (
                <div key={msg.id}>
                  <Comment>
                    <Comment.Content>
                      <Comment.Author style={{ color: theme.colors.gray }}>
                        {msg?.owner?.details?.agencyName ||
                          msg?.owner?.details?.fullName}
                      </Comment.Author>
                      <Comment.Text
                        style={{ color: theme.colors.white, fontSize: "12px" }}
                      >
                        #{msg.content}
                      </Comment.Text>

                      {/* Display Image if exists */}
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Tweet"
                          style={{
                            width: "100%",
                            maxHeight: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginTop: "10px",
                          }}
                        />
                      )}

                      {/* Display GIF if exists */}
                      {msg.gif && (
                        <img
                          src={msg.gif}
                          alt="GIF"
                          style={{
                            width: "100%",
                            maxHeight: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginTop: "10px",
                          }}
                        />
                      )}
                    </Comment.Content>
                  </Comment>
                </div>
              ))}
            </Comment.Group>
          </div>
          <div
            style={{
              background: theme.colors.mainbg,
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              padding: "10px ",

              borderTop: `1px solid ${theme.border.primary}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                paddingBottom: "10px",
                paddingRight: "20px",
              }}
            >
              {/* Upload Image Button */}
              <label htmlFor="upload-photo">
                <CustomIcon
                  name="image outline"
                  size="large"
                  style={{ fontSize: "22px", color: theme.colors.white }}
                />
              </label>
              <Input
                type="file"
                accept="image/*"
                id="upload-photo"
                style={{ display: "none" }}
                onClick={handleImageUpload}
              />

              <Input
                name="input"
                placeholder="What’s Happening?"
                size="mini"
                style={{
                  border: "none",
                  fontSize: "16px",
                  flex: 1,
                  outline: "none",
                  height: "36px",
                  background: "transparent",
                  color: theme.colors.white,
                }}
                value={input}
                fluid
                onChange={(e) => setInput(e.target.value)}
              />

              {/* Emoji Picker Button */}
              {/* <CustomIcon
                name="smile outline"
                size="large"
                style={{ color: theme.colors.white }}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              /> */}

              <Button
                icon="send"
                color="blue"
                style={{ marginLeft: "10px" }}
                onClick={handleSend}
              />
            </div>

            {showEmojiPicker && (
              <div style={{ position: "absolute", bottom: "50px", zIndex: 10 }}>
                <EmojiPicker
                  onEmojiClick={(emojiObject) =>
                    setInput((prevInput) => prevInput + emojiObject.emoji)
                  }
                />
              </div>
            )}
          </div>
        </>
      )}
    </Segment>
  );
};

export default PostBox;
