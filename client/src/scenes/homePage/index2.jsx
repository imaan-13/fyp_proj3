
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import React, { useEffect, useState } from "react";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import CreateEventForm from "scenes/EventPage/CreateEvent";
import ChatBox from "components/chat";
import VerificationForm from "scenes/EventPage/VerificationPage";
const Eventpage =()=>{
  

const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [isVerified, setIsVerified] = useState(false);
  const fetchVerificationStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/event-organizer/verify-status/${_id}`
        // Adjust the endpoint URL to match your backend route
      );

      if (response.ok) {
        const data = await response.json();
        setIsVerified(data.isVerified); // Assuming your API response has an "isVerified" property
        console.log(isVerified)
      } else {
        console.error("Error fetching verification status");
      }
    } catch (error) {
      console.error("An error occurred while fetching verification status:", error);
    }
  };
  useEffect(() => {
  

    fetchVerificationStatus();
  }, [_id]);

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
          <UserWidget userId={_id} picturePath={picturePath} loggedInUser={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={picturePath} /> */}
          {/* <PostsWidget userId={_id} /> */}
          {/* <VerificationForm></VerificationForm>
          <CreateEventForm/> */}
           {isVerified === null ? (
            // Loading state or a loader component
            <p>Loading...</p>
          ) : isVerified ? (
            <CreateEventForm />
          ) : (
            <VerificationForm />
          )}
        </Box>
       

{isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <ChatBox></ChatBox>
            {/* <ChatComponent></ChatComponent> */}
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={_id} /> */}
            
            {/* <FriendListWidget userId={_id} userfriend={userFriends}/> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};



export default Eventpage;