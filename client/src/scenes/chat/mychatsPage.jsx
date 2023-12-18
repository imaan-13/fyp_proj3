
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
import Search from "components/chatComponents/Search";
import Home from "./Home";
import Sidebar from "components/chatComponents/Sidebar";
import Chat from "components/chatComponents/chat";
import { getFirestore,getDocs, collection, doc, getDoc, query, where, setDoc,serverTimestamp,updateDoc} from 'firebase/firestore';
import {db,storage} from "../../firebase";
import { useState, useEffect } from "react";
const MyChats =()=>{
  

const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);


  const[chatData,setchatData ]=useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const[chat,setChat]=useState(null);

  // const handleSelect = (chatInfo) => {
  //   // Handle the selected chat, you can set it to state or perform any other actions
  //   // setSelectedChat(chatInfo);
  //   console.log(_id+chatInfo);
  // };


  const handleSelect = async (chatInfo) => {
    const combinedId = _id > chatInfo.id ? _id + chatInfo.id : chatInfo.id + _id;
  console.log("combineid",combinedId)
    // Assuming you have a 'chats' collection in your Firestore
    const chatDocRef = doc(collection(db, 'chats'), combinedId);
  
    try {

      
      const chatDocSnapshot = await getDoc(chatDocRef);
  
      if (chatDocSnapshot.exists()) {
        // Chat ID exists, do something with it
        // setSelectedChat(combinedId);

        setSelectedChat(combinedId);
        setchatData (chatDocSnapshot.data());
    // console.log('Chat data:', chatData);
        // console.log(chatDocSnapshot);
        // console.log("selected",selectedChat)
        // console.log("true!");
      } else {
        // Chat ID does not exist, you may want to create it or handle accordingly
        console.log('Chat ID does not exist');
      }
    } catch (error) {
      console.error('Error checking if chat ID exists:', error);
    }
  };
  

  const [user, setUser] = useState(null);
  const[searchuser, setSearchuser]=useState(null);

  const [err, setErr] = useState(false);


  const usersCollection = collection(db, 'user');
  const userDocRef = doc(usersCollection, _id);
  
  const fetchUser = async () => {
    try {
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log('User data:', userData);
        setUser(userData);
        setErr(false);
      } else {
        console.log('User not found');
        setUser(null);
        setErr(true);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setErr(true);
    }
  };
  
  useEffect(() => {
    fetchUser();
    console.log("selected", selectedChat);
    console.log("chat", chatData)
    console.log("true!");
  }, [selectedChat, chatData]);  


 

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
         <div className="mychats-container">

          <div className="home">
          <div className="container">
          <Sidebar userId={_id} picturePath={picturePath} handleSelect={handleSelect} currentUser={user}></Sidebar>
          {/* <Chat></Chat> */}

          {selectedChat&& <Chat selectedChat={selectedChat} user={user} chatData={chatData}/>}
          {/* {selectedChat && <Chat selectedChat={selectedChat} />} */}

          </div>
          </div>
      
          </div>
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