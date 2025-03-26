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
import { useDispatch, useSelector } from "react-redux";
import { AddComments } from "../../modules/Home/Api/index";
import { AddCommentsByIdRequest } from "../../modules/Home/Actions";
const CommentSection = ({ postId }) => {
  const { comments } = useSelector((state) => state.AllPost);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const [replyData, setReplyData] = useState({});

  const handleReplyToggle = (commentId) => {
    setReplyData((prev) => ({
      ...prev,
      [commentId]: { ...prev[commentId], isOpen: !prev[commentId]?.isOpen },
    }));
  };

  const handleAddComment = async (postId) => {
    if (newComment.trim() === "") return;
    console.log(postId);
    const data = {
      content: newComment,
    };
    try {
      dispatch(AddCommentsByIdRequest(postId, data));
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddReply = async (commentId) => {
    const replyText = replyData[commentId]?.text || "";
    if (replyText.trim() === "") return;

    const newReplyObj = {
      parentId: commentId,
      content: replyText,
    };

    try {
      await AddComments(newReplyObj); // Send reply to API
      setReplyData((prev) => ({
        ...prev,
        [commentId]: { isOpen: false, text: "" }, // Clear input field
      }));
    } catch (error) {
      console.error("Error adding reply:", error);
    }
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
            onClick={() => handleAddComment(postId)}
          />
        </div>
      </Form>
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} style={{ padding: "10px 15px" }}>
            <CommentAvatar
              src={comment?.ownerDetails?.avatar}
              style={{
                paddingTop: "5px",
                borderRadius: "50% !important",
                width: "40px",
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

            {/* Reply TextArea */}
            {replyData[comment.id]?.isOpen && (
              <Form reply>
                <div style={{ display: "flex", gap: "10px" }}>
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
        ))
      ) : (
        <p style={{ color: "white" }}>No comments yet.</p>
      )}
    </CommentGroup>
  );
};

export default CommentSection;
