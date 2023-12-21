// components/CommentSection.jsx
import React, { useState,useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Comment from "components/comment.jsx";
import { useSelector } from "react-redux";

const CommentSectionEvent = ({ postId, user}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]); // Assuming you have a list of comments for each post
  const token = useSelector((state) => state.token)



  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData);
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments();
  }, [postId, token]);




  const handleCommentSubmit = () => {
    
    // const newComment = { text: commentText, user: "Current User" }; // Replace with actual user data
    // setComments([...comments, newComment]);
    // setCommentText("");
    try {
        const response =  fetch(`http://localhost:3000/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ text: commentText, user: user }), // Replace' with actual user data
        });
    
        if (response.ok) {
          const newComment =  response.json();
          setComments((prevComments) => [...prevComments, newComment]);
        } else {
          console.error('Failed to add comment');
        }
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
  };

  return (
    <Box mt={2}>
      <Typography variant="h6" color="text.primary" style={{ marginBottom: '10px' }}>
        Comments
      </Typography>
      {comments.map((comment) => (
        <Comment text={comment.text} username={comment.user} />
      ))}
      <Box mt={2}>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          style={{ marginTop: "8px" }}
        >
          Add Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentSectionEvent;
