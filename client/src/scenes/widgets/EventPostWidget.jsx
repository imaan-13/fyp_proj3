
  

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
  // import { SaveOutlinedIcon, SavedIcon } from "@mui/icons-material";
  import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
  import BookmarkIcon from '@mui/icons-material/Bookmark';
  import DeleteIcon from '@mui/icons-material/Delete';
  import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
  const EventPostWidget = ({
  //   title,
    // body,
    photo,
    postedBy,
    userName,
    userPhoto,
    postId,
    eventName,
    // photo={post.photo}
    // postedBy={post.postedBy}
    // firstName={user._id.firstName}
    date,
    
    time,
    location,
    details,
    contact,
    community,
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
   const [isSaved, setIsSaved] = useState("");
   const [numberLikes,setNumberLikes]=useState([]);
    let datePart="";
   if(date){
   datePart = date.substring(0, 10);
   }
   useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/event/${postId}/`, {
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
          setNumberLikes(postData.likes.length);
          // setIsSaved(postData.saved.includes(loggedInUserId));
          console.log(postData.saved.includes(loggedInUserId));
          if (postData.saved && Array.isArray(postData.saved)) {
            setIsSaved(postData.saved.includes(loggedInUserId));
          } else {
            // Handle the case where 'saved' is missing or not an array
            console.error("'saved' property is missing or not an array");
          }
          console.log(postData.likes.length);
         
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
      const response = await fetch(`http://localhost:3000/event/${postId}/like`, {
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
  
      const toggleSavePost = async () => {
        try {
          const response = await fetch(`http://localhost:3000/event/${postId}/save`, {
            method: "PUT",
            body: JSON.stringify({ userId: loggedInUserId,
            postId:postId }),
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          });
      
          if (response.ok) {
            const updatedPost = await response.json();
            setPost(updatedPost); 
            setIsSaved(updatedPost.saved.includes(loggedInUserId)); // Toggle the saved status
          } else {
            console.error("Error updating saved status");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
      
    //   const dateTime = new Date(dateTime);

    return (
      <WidgetWrapper m="2rem 0">
       
      
        
        {userName && (
          <Typography variant="h6" color="text.primary" sx={{ mt: "1rem" }}>
            <Box display="flex" alignItems="center">
            {userPhoto&&(<UserImage image={userPhoto}></UserImage>)}
            {/* {userName} */}
            {userName && (
            <span style={{ marginLeft: userPhoto ? "0.5rem" : 0 }}>{userName}</span>
          )}
            </Box>
          </Typography>
        )}
        {eventName && (
        
          <Typography color="text.primary" sx={{ mt: "1rem" }}>
            <label>Event: </label>
            {eventName}
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

          {/* Display event date and time */}
      {date && (
        
        <Typography color="text.primary" sx={{ mt: "1rem" }}>
          <label>Date </label>
          {datePart}
        </Typography>
      )}
     {time && (
        
        <Typography color="text.primary" sx={{ mt: "1rem" }}>
          <label>Time </label>
          {time}
        </Typography>
      )}
      {/* Display event location */}
      {location && (
        <Typography color="text.primary" sx={{ mt: "1rem" }}>
          <label>Location Type: </label>
          {location}
        </Typography>
      )}

      {/* Display event details */}
      {details && (
        <Typography color="text.primary" sx={{ mt: "1rem" }}>
          <label>Details: </label>
          {details}
        </Typography>
      )}

      {/* Display contact information */}
      {contact && (
        <Typography color="text.primary" sx={{ mt: "1rem" }}>
          <label>Contact: </label>
          {contact}
        </Typography>
      )}

      {/* Display community */}
      {community && (
        <Typography color="text.primary" sx={{ mt: "1rem" }}>
          <label>Community: </label>
          {community}
        </Typography>
      )}
        {/* {postedBy && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: "1rem" }}>
            Posted by: {postedBy}
          </Typography>
        )} */}
      
      <Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
         <FormControlLabel
              control = {
                 <Checkbox
                    icon = {<FavoriteBorderIcon />}
                    checkedIcon = {<FavoriteIcon />}
                    onChange={patchLike}
                    checked={isLiked}
                    
                 />
              }
              label = {numberLikes}
           />
            <span style={{ cursor: 'pointer', verticalAlign: 'middle' }}>
          <InsertCommentOutlinedIcon sx={{ marginTop: '7px' }} />

         </span>
         </Box>
              <FormControlLabel
          control={
            <Checkbox
              icon={<BookmarkBorderIcon />} // Icon for saving
              checkedIcon={<BookmarkIcon />} // Icon for saved
              onChange={toggleSavePost}
              checked={isSaved}
            />
          }
          label="Save" // You can customize the label as needed
        />
    
        {(postedBy===loggedInUserId)&&<DeleteIcon style={{ cursor: "pointer" }} />}
        </Box>
      </Typography>
      <Typography>
      
      </Typography>

      </WidgetWrapper>
    );
  };
  
  export default EventPostWidget;
  