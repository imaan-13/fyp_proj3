
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

import { useSelector } from "react-redux";
import ChatBox from "components/chat";
const Homepage =()=>{

  const { _id, picturePath, token } = useSelector((state) => state.user);

  
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