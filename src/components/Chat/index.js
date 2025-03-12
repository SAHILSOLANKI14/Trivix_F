import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Comment, Image, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { Button } from "../../shared";
import Fields from "../../shared/Form/Fields/Fields";
import Form from "../../shared/Form/Form";
import CustomIcon from "../../shared/Icon";
import { theme } from "../../Theme/theme";
import { useSelector, useDispatch } from "react-redux";
import { CreatTweetsRequest } from "../../modules/Profile/Actions";
// import { addTweet } from "../../redux/actions/tweetActions";

const schema = Yup.object().shape({
  input: Yup.string().required("Tweet cannot be empty"),
});

const PostBox = () => {
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const tweets = useSelector(
    (state) => state.AllTweet?.AllTWeetData?.tweets || []
  );

  const handleSend = () => {
    if (input.trim() === "") return;

    const data = {
      content: input,
      // owner: {
      //   details: {
      //     agencyName: "Current User",
      //   },
      // },
    };

    dispatch(CreatTweetsRequest({ ...data }));
    setInput("");
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
  };

  return (
    <Segment
      style={{
        maxWidth: "450px",
        margin: "auto",
        boxShadow: "none",
        minHeight: "600px",
        background: theme.colors.black,
        position: "relative",
        border: `1px solid ${theme.border.primary}`,
        borderRadius: "15px",
        padding: "10px",
      }}
    >
      <div
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          paddingRight: "10px",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <Comment.Group style={{ padding: "10px" }}>
          {tweets.map((msg) => (
            <Comment key={msg.id}>
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
          ))}
        </Comment.Group>
      </div>

      <Form validateSchemas={schema} onSubmit={handleSend}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
            marginTop: "10px",
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
        <div style={{ position: "absolute", zIndex: 10, marginTop: "10px" }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </Segment>
  );
};

export default PostBox;
