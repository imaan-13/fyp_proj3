


import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Button, Card, CardContent, Divider } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const EventRecommendation = () => {
  const { _id, picturePath, token, user } = useSelector((state) => state.user);
  const [eventPosts, setEventPosts] = useState([]);
  const [recommendedPosts,setrecommendedPosts]=useState([]);
  console.log(recommendedPosts);
  // useEffect(() => {
  //   if (Array.isArray(recommendedPosts)) {
  //     setEventPosts(recommendedPosts);
  //   }
  // }, [recommendedPosts]);

  
  useEffect(() => {
    const fetchMostLikedCommunity = async () => {
      try {
        const response = await fetch("http://localhost:3000/event/mostLikedCommunity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
           
          },
          
          body: JSON.stringify({ userId: _id }),
        });

        const data = await response.json();
        console.log("FETCH COMMUNITY",data);
        // setMostLikedCommunity(data);
        setrecommendedPosts(data)
      } catch (error) {
        console.error("Error fetching most liked community:", error);
      }
    };
   
    fetchMostLikedCommunity();
    // fetchPosts();
    
  }, [_id]);



  // let datePart="";
  // if(date){
  // datePart = date.substring(0, 10);
  // }
  console.log("Is recommendedPosts an array?", Array.isArray(eventPosts));
  console.log("Recommended Posts:", eventPosts);

  if (recommendedPosts.length === 0) {
    return <Typography>No recommended posts available.</Typography>;
  }

  return (
    <WidgetWrapper>
      <h3>Recommended Events</h3>
      
      {recommendedPosts.length>0 && recommendedPosts.map((post, index) => (
        <React.Fragment key={post._id}>
          <CardContent>
            <strong>
              <Typography variant="h5">{post.eventName}</Typography>
            </strong>
  
            <Typography>{post.startDate.substring(0,10)}</Typography>
            <Typography>{post.startTime}</Typography>
            {/* Add more details as needed */}
          </CardContent>
          {index < recommendedPosts.length - 1 && <Divider />} {/* Add Divider if not the last post */}
        </React.Fragment>
      ))
}
    </WidgetWrapper>
  );
};

export default EventRecommendation;
