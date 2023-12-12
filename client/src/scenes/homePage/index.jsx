
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
import EventRecommendation from "scenes/widgets/RecommendedWidgets";
const Homepage =()=>{

  const { _id, picturePath, token, user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [recommendedPosts,setrecommendedPosts]=useState([]);
  const [mostLikedCommunity, setMostLikedCommunity] = useState(null);

  // const fetchMostLikedCommunity = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/event/mostLikedCommunity`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json" },

  //       body:{
  //         userId:_id,
  //       }
  //     });
  
  //     // Assuming the response is in JSON format, you need to use response.json()
  //     const data = await response.json();
      
  //     setMostLikedCommunity(data);
  //   } catch (error) {
  //     console.error("Error fetching most liked community:", error);
  //   }
  // };
  
  // useEffect(() => {
  //  console.log(mostLikedCommunity);
  // fetchMostLikedCommunity();
 

  // }, [_id]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // const fetchPosts = async (url) => {
  //   setPosts([]);

  //   const response = await fetch("http://localhost:3000/posts", {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   console.log("Fetched Posts:", data);
  //   const shuffledMyPosts = shuffleArray(response.data);
  //       // setMyPostData(shuffledMyPosts);
  //   setPosts(shuffledMyPosts);
  
  // };

  // useEffect(() => {
  //   const fetchMostLikedCommunity = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/event/mostLikedCommunity", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
           
  //         },
          
  //         body: JSON.stringify({ userId: _id }),
  //       });

  //       const data = await response.json();
  //       console.log("FETCH COMMUNITY",data);
  //       // setMostLikedCommunity(data);
  //       setrecommendedPosts(data)
  //     } catch (error) {
  //       console.error("Error fetching most liked community:", error);
  //     }
  //   };
   
  //   fetchMostLikedCommunity();
  //   // fetchPosts();
    
  // }, [_id]);


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
            {/* <ChatBox></ChatBox> */}
           <EventRecommendation></EventRecommendation>
           {/* { recommendedPosts.map((post) => (
          
          <EventRecommendation key={post._id} post={post} />
      ))} */}
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

