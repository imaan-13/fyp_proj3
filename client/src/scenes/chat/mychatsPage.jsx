
import Navbar from "scenes/navbar";
import Navbar2 from "scenes/navbar/newsFeedNav";
import UserWidget from "scenes/widgets/UserWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
import EventPostsWidget from "scenes/widgets/EventPostsWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavbarWithProps from "scenes/navbar/communityNewsFeed";
import ChatBox from "components/chat";
const MyChats =()=>{
  

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
          
          <h3>MY CHATS</h3>
         

          {/* <NavbarWithProps isComm={true} Comm={"Arts & Culture"}></NavbarWithProps> */}
          
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
      
          </Box>
        )}
      </Box>
    </Box>
  );
};



export default MyChats;