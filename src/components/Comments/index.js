import React, { useState } from "react";
import {
  Comment,
  CommentActions,
  CommentAuthor,
  CommentAvatar,
  CommentContent,
  CommentGroup,
  CommentMetadata,
  CommentText,
  Form,
  Input,
} from "semantic-ui-react";
import { Button } from "../../shared";
import { theme } from "../../Theme/theme";
import { useSelector } from "react-redux";

const CommentSection = () => {
  // const [comments, setComments] = useState([
  //   {
  //     id: 1,
  //     author: "Matt",
  //     avatar: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
  //     time: "Today at 5:42PM",
  //     text: "How artistic!",
  //     replies: [],
  //   },
  // ]);

  const { comments } = useSelector((state) => state.AllPost);

  // State for handling new comments
  const [newComment, setNewComment] = useState("");

  // State for managing reply toggles and texts
  const [replyData, setReplyData] = useState({});

  // Function to handle reply toggle
  const handleReplyToggle = (commentId) => {
    setReplyData((prev) => ({
      ...prev,
      [commentId]: { ...prev[commentId], isOpen: !prev[commentId]?.isOpen },
    }));
  };

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentObj = {
      id: comments.length + 1,
      author: "New User",
      avatar: "https://react.semantic-ui.com/images/avatar/small/steve.jpg",
      time: "Just now",
      text: newComment,
      replies: [],
    };

    // setComments([newCommentObj, ...comments]);
    setNewComment(""); // Clear input field
  };

  // Function to handle adding a reply
  const handleAddReply = (commentId) => {
    const replyText = replyData[commentId]?.text || "";
    if (replyText.trim() === "") return;

    const newReply = {
      id: Date.now(),
      author: "New User",
      avatar: "https://react.semantic-ui.com/images/avatar/small/steve.jpg",
      time: "Just now",
      text: replyText,
    };

    // setComments((prevComments) =>
    //   prevComments.map((comment) =>
    //     comment.id === commentId
    //       ? { ...comment, replies: [...comment.replies, newReply] }
    //       : comment
    //   )
    // );

    // Reset the reply input field and close it
    setReplyData((prev) => ({
      ...prev,
      [commentId]: { isOpen: false, text: "" },
    }));
  };
  console.log(comments);
  return (
    <CommentGroup>
      {/* Add new comment */}
      <Form reply>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            fluid
            style={{ marginBottom: "0px", width: "100%" }}
          />
          <Button
            icon="send"
            color="blue"
            style={{ padding: "10px" }}
            onClick={handleAddComment}
          />
        </div>
      </Form>

      {/* Display comments dynamically */}
      {comments.map((comment) => (
        <Comment key={comment.id} style={{ padding: "10px 15px" }}>
          <CommentAvatar
            src={comment?.ownerDetails?.avatar}
            style={{
              paddingTop: "5px",
              borderRadius: "50% !important",
              width: "40px", // Adjust size as needed
              height: "40px",
              objectFit: "cover",
            }}
          />

          <CommentContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CommentAuthor style={{ color: theme.colors.white }}>
                {comment?.ownerDetails?.userName}
              </CommentAuthor>
              <CommentActions>
                <a
                  style={{ color: theme.colors.gray, cursor: "pointer" }}
                  onClick={() => handleReplyToggle(comment.id)}
                >
                  Reply
                </a>
              </CommentActions>
            </div>
            <CommentMetadata style={{ color: theme.colors.gray }}>
              {comment.createdAt}
            </CommentMetadata>
            <CommentText style={{ color: theme.colors.white }}>
              {comment.content}
            </CommentText>
          </CommentContent>

          {/* Reply TextArea for Comments */}
          {replyData[comment.id]?.isOpen && (
            <Form reply>
              <div style={{ display: "flex", gap: "10px"  }}>
                <Input
                  value={replyData[comment.id]?.text || ""}
                  onChange={(e) =>
                    setReplyData({
                      ...replyData,
                      [comment.id]: {
                        ...replyData[comment.id],
                        text: e.target.value,
                      },
                    })
                  }
                  placeholder="Write a reply..."
                  fluid
                  style={{ marginBottom: "0px", width: "100%" }}
                />
                <Button
                  icon="send"
                  color="blue"
                  style={{ padding: "10px" }}
                  onClick={() => handleAddReply(comment.id)}
                />
              </div>
            </Form>
          )}

          {/* Show Replies */}
          {comment?.replies?.length > 0 && (
            <CommentGroup>
              {comment.replies.map((reply) => (
                <Comment key={reply.id}>
                  <CommentAvatar src={reply.avatar} />
                  <CommentContent>
                    <CommentAuthor style={{ color: theme.colors.white }}>
                      {reply.author}
                    </CommentAuthor>
                    <CommentMetadata style={{ color: theme.colors.gray }}>
                      {reply.time}
                    </CommentMetadata>
                    <CommentText style={{ color: theme.colors.white }}>
                      {reply.text}
                    </CommentText>
                  </CommentContent>
                </Comment>
              ))}
            </CommentGroup>
          )}
        </Comment>
      ))}
    </CommentGroup>
  );
};

export default CommentSection;
