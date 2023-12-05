
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
import { Box, useMediaQuery } from "@mui/material";
import PostsWidget from "scenes/widgets/PostsWidget";
import EventPostsWidget from "scenes/widgets/EventPostsWidget";
import { useSelector } from "react-redux";
import NavbarWithProps from "scenes/navbar/communityNewsFeed";
import ChatBox from "components/chat";
const SocialPage =({showEvents})=>{
  

const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

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
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} loggedInUser={_id}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={picturePath} /> */}
          {/* <PostsWidget userId={_id} /> */}
            <h3>SOCIAL COMMUNITY</h3>
            <NavbarWithProps isComm={true} Comm={"Social"}></NavbarWithProps>
          
          {/* <PostsWidget community={"Education"} isCommunity={true} /> */}
         { showEvents &&(
          <PostsWidget community={"Social"} isCommunity={true}></PostsWidget>
          
          )}

         <EventPostsWidget isCommunity={true} community={"Social"}></EventPostsWidget>
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <ChatBox></ChatBox>

            <Box m="2rem 0" />
            {/* <FriendListWidget userId={_id} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};



export default SocialPage;