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
const CommentSection = () => {
  // State to store comments
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Matt",
      avatar: "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
      time: "Today at 5:42PM",
      text: "How artistic!",
      replies: [],
    },
  ]);

  // State for handling new comments‚
  const [newComment, setNewComment] = useState("");

  // State for handling reply boxes
  const [replyOpen, setReplyOpen] = useState({});

  // State for storing reply text
  const [replyText, setReplyText] = useState({});

  // Function to handle reply click
  const handleReplyClick = (commentId) => {
    setReplyOpen((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
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

    setComments([newCommentObj, ...comments]);
    setNewComment(""); // Clear input field
  };

  // Function to handle adding a reply
  const handleAddReply = (commentId) => {
    if (!replyText[commentId] || replyText[commentId].trim() === "") return;

    const newReply = {
      id: Date.now(),
      author: "New User",
      avatar: "https://react.semantic-ui.com/images/avatar/small/steve.jpg",
      time: "Just now",
      text: replyText[commentId],
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );

    setReplyText((prev) => ({ ...prev, [commentId]: "" }));
    setReplyOpen((prev) => ({ ...prev, [commentId]: false }));
  };

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
        <Comment key={comment.id}>
          <CommentAvatar src={comment.avatar} />
          <CommentContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CommentAuthor style={{ color: theme.colors.black }}>
                {comment.author}
              </CommentAuthor>
              <CommentActions>
                <a
                  style={{ color: theme.colors.black }}
                  onClick={() => handleReplyClick(comment.id)}
                >
                  Reply
                </a>
              </CommentActions>
            </div>
            <CommentMetadata style={{ color: theme.colors.black }}>
              {comment.time}
            </CommentMetadata>
            <CommentText style={{ color: theme.colors.black }}>
              {comment.text}
            </CommentText>
          </CommentContent>

          {/* Reply TextArea for Comments */}
          {replyOpen[comment.id] && (
            <Form reply>
              <div style={{ display: "flex", gap: "10px" }}>
                <Input
                  value={replyText[comment.id] || ""}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [comment.id]: e.target.value })
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
          {comment.replies.length > 0 && (
            <CommentGroup>
              {comment.replies.map((reply) => (
                <Comment key={reply.id}>
                  <CommentAvatar src={reply.avatar} />
                  <CommentContent>
                    <CommentAuthor style={{ color: theme.colors.black }}>
                      {reply.author}
                    </CommentAuthor>
                    <CommentMetadata style={{ color: theme.colors.black }}>
                      {reply.time}
                    </CommentMetadata>
                    <CommentText style={{ color: theme.colors.black }}>
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
