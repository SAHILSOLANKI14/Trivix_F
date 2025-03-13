import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Comment, Image, Segment } from "semantic-ui-react";
import { Button } from "../../shared";
import {
  CreatTweetsRequest,
  getAllTweetsRequest,
} from "../../modules/Profile/Actions";
import { theme } from "../../Theme/theme";
import Form from "../../shared/Form/Form";
import Fields from "../../shared/Form/Fields/Fields";
import CustomIcon from "../../shared/Icon";
import EmojiPicker from "emoji-picker-react";
import * as Yup from "yup";
import useWindowSize from "../../hooks/Screen";
import Loader from "../../utility/Loader";

const schema = Yup.object().shape({
  input: Yup.string().required("Tweet cannot be empty"),
});

const PostBox = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [page, setPage] = useState(1);
  const isMobile = width < 768;
  const tweetsContainerRef = useRef(null); // Reference for scroll container

  const { AllTWeetData, hasMore, loading } = useSelector(
    (state) => state?.AllTweet
  );
  const tweets = AllTWeetData?.tweets || [];
  const limit = 20;
  useEffect(() => {
    dispatch(getAllTweetsRequest(page, limit));
  }, [dispatch, page]);

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
    if (input.trim() === "") return;

    const data = { content: input };
    dispatch(CreatTweetsRequest(data));
    setInput("");
    setShowEmojiPicker(false);

    setTimeout(() => {
      setPage(1);
      dispatch(getAllTweetsRequest(1));
    }, 1000);
  };

  return (
    <Segment
      style={{
        height: "95vh",
        display: "flex",
        flexDirection: "column",
        background: theme.colors.black,
        borderRadius: isMobile ? "0px" : "15px",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            ref={tweetsContainerRef}
            style={{
              flex: 1,
              overflowY: "auto",
              paddingRight: "10px",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <Comment.Group style={{ padding: "10px" }}>
              {tweets.map((msg) => (
                <div key={msg.id}>
                  <Comment>
                    <Comment.Content>
                      <Comment.Author style={{ color: theme.colors.white }}>
                        {msg?.owner?.details?.agencyName ||
                          msg?.owner?.details?.fullName}
                      </Comment.Author>
                      <Comment.Text style={{ color: theme.colors.gray }}>
                        {msg.content}
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                </div>
              ))}
            </Comment.Group>
          </div>
          <div
            style={{
              position: "sticky",
              bottom: "0",
              background: theme.colors.black,
              padding: "10px",
              borderTop: `1px solid ${theme.border.primary}`,
            }}
          >
            <Form validateSchemas={schema} onSubmit={handleSend}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingBottom: "10px",
                }}
              >
                <Image
                  src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                  avatar
                />
                <Fields.Input
                  name="input"
                  placeholder="What’s Happening?"
                  fluid
                  style={{
                    border: "none",
                    fontSize: "16px",
                    flex: 1,
                    outline: "none",
                    padding: "10px",
                    background: "transparent",
                    color: theme.colors.white,
                  }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: "15px" }}>
                  <CustomIcon
                    name="image outline"
                    size="large"
                    style={{ fontSize: "22px", color: theme.colors.white }}
                  />
                  <CustomIcon
                    name="smile outline"
                    size="large"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    style={{
                      cursor: "pointer",
                      fontSize: "22px",
                      color: theme.colors.white,
                    }}
                  />
                </div>

                <Button
                  content="Post"
                  color="blue"
                  style={{
                    borderRadius: "20px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                  }}
                  onClick={handleSend}
                />
              </div>
            </Form>

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
