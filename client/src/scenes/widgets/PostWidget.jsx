
  

  import Friend from "components/Friend";
import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import UserImage from "components/UserImage";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
// import { dispatch } from "react";
import { useDispatch } from 'react-redux';
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
// import {  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
const PostWidget = ({
//   title,
  body,
  photo,
  postedBy,
  userName,
  userPhoto,
  postId,
  // community,
}) => {
  
 const loggedInUserId = useSelector((state) => state.user._id);
 
//  const isLiked = Boolean(loggedInUserId.likes);
//  const likeCount = loggedInUserId.likes.length;
const dispatch=useDispatch()
 const token = useSelector((state) => state.token)
 const [post, setPost] = useState([]);
// const [postLikes,setpostLikes]=useState()

//  const [isChecked, setIsChecked] = useState(false);
 const [isLiked, setIsLiked] = useState("false");
 const [numberLikes,setNumberLikes]=useState([]);
 const navigate = useNavigate();

 useEffect(() => {
  const fetchPostData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "GET",
        // body: JSON.stringify({postId:postId }),
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const postData = await response.json();
        const postIsLiked=postData.likes.includes(loggedInUserId);
        console.log(postIsLiked);
        setPost(postData); // Set the post data in state
        setIsLiked(postData.likes.includes(loggedInUserId)); // Set like status
        console.log(postData.likes.length);
        
        setNumberLikes(postData.likes.length);
      } else {
        console.error("Error fetching post data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  fetchPostData();
  // if(setIsLiked(true)){

  // }
}, [postId, token, loggedInUserId]);

const patchLike = async () => {
      
  try {
    const response = await fetch(`http://localhost:3000/posts/${postId}/like`, {
      method: "PUT",
      body: JSON.stringify({ userId: loggedInUserId,
      postId:postId }),
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost); // Update the post state with the updated post data
        // window.location.reload();
        setIsLiked(updatedPost.likes.includes(loggedInUserId))
        setNumberLikes(updatedPost.likes.length);
      } else {
        // Handle error scenarios
        console.error("Error updating like status");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    };


  return (
    <WidgetWrapper m="2rem 0">
     
    
      
      {userName && (
       
        // <Typography variant="h6" color="text.primary" sx={{ mt: "1rem" }} >
        <Typography
        variant="h6"
        color="text.primary"
        sx={{ mt: "1rem", cursor: "pointer" }}
        onClick={() => navigate(`/other-user/${postedBy}`)} // Use the correct URL for the user's profile
      >
          <Box display="flex" alignItems="center">
          {userPhoto&&(<UserImage image={userPhoto}></UserImage>)}
          {/* {userName} */}
          {userName && (
          <span style={{ marginLeft: userPhoto ? "0.5rem" : 0 }}  >{userName}</span>
        )}

         
          </Box>
       
        </Typography>
   
      )}
      {body && (
        <Typography color="text.primary" sx={{ mt: "1rem" }}>
          {body}
        </Typography>
      )}
      {photo && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={photo}
        />
      )}
      {/* {postedBy && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: "1rem" }}>
          Posted by: {postedBy}
        </Typography>
      )} */}
    
    <Typography>
 
       {/* <FormControlLabel
            control = {
               <Checkbox
                  icon = {<FavoriteBorderIcon />}
                  checkedIcon = {<FavoriteIcon />}
                  onChange={patchLike}
                  checked={isLiked}
                  
               />
               
            }
            
           
            label = {numberLikes}
         /> */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorderIcon />}
                checkedIcon={<FavoriteIcon />}
                checked={isLiked}
                onChange={patchLike}
              />
            }
            label={numberLikes}
          />
          {/* <CommentIcon style={{ cursor: "pointer" }}></CommentIcon> */}
          <span style={{ cursor: 'pointer', verticalAlign: 'middle' }}>
          <InsertCommentOutlinedIcon sx={{ marginTop: '7px' }} />

        </span>
          </Box>

          {(postedBy===loggedInUserId)&&<DeleteIcon style={{ cursor: "pointer" }} />}
        </Box>
        
        
    </Typography>
  

    </WidgetWrapper>
  );
};

export default PostWidget;
