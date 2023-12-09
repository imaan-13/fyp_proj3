
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostWidget from "scenes/widgets/PostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import EventPostsWidget from "scenes/widgets/EventPostsWidget";
import Navbar2 from "scenes/navbar/newsFeedNav";
import NavbarWithProps from "scenes/navbar/communityNewsFeed";
import { Box, useMediaQuery } from "@mui/material";
import ChatComponent from "components/chat";
// import ChatPanel from "components/chat";
// import ChatBox from "components/chat";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ChatBox from "components/chat";
import LocationTracker from "components/LocationTracker";
const Homepage =()=>{

  const { _id, picturePath, token, user } = useSelector((state) => state.user);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setUserLocation([longitude, latitude]);
  
  //       try {
  //         const response = await fetch(`http://localhost:3000/users/userlocation/${_id}`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ coordinates: userLocation }),
  //         });
  
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }
  
  //         const responseData = await response.json();
  //         console.log(responseData);
  //       } catch (error) {
  //         console.error('Fetch error:', error);
  //       }
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }, [user, setUserLocation, userLocation]);
  
  

const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        
      >
         
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined} >
          <UserWidget userId={_id} loggedInUser={_id} picturePath={picturePath} />
         
         
        </Box>
        
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          
        >
        
           <MyPostWidget picturePath={picturePath} />
          <br></br>
           <NavbarWithProps isMain={true}></NavbarWithProps>
    
         
          <PostsWidget isProfile={false}/> 
          <EventPostsWidget isProfile={false}></EventPostsWidget>
         
          </Box>
          <LocationTracker></LocationTracker>
        {/* <FriendListWidget></FriendListWidget> */}
        {/* </Box> */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <ChatBox></ChatBox>
           
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={_id} /> */}
            
            {/* <FriendListWidget userId={_id} userfriend={userFriends}/> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};



export default Homepage;