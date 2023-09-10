import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import WidgetWrapper from './WidgetWrapper';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Box, useMediaQuery } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import FlexBetween from './FlexBetween';
import {
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from "@mui/material";
import {
  Search,

} from "@mui/icons-material";
import { useSelector } from 'react-redux';
import FriendChat from './FriendChat';
const ChatBox = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const {_id}=useSelector((state)=>state.user);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const [friends, setFriends] = useState([]); // Store user's friends
  const [searchText, setSearchText] = useState(''); // Store search input
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('')
  const [isSelected, setisSelected]=useState(false)



  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${_id}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // console.log(data.friends.firstName)
    setFriends(data)
    
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      text: inputText,
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleFriendSelection = (e) => {
    setSelectedFriend(e.target.value);
    setisSelected(true);


  };



 
  return (
    <WidgetWrapper>
    <Container maxWidth="xs">
    <Box display="flex" alignItems="center" padding="0.2rem">
    <ChatIcon></ChatIcon>
    <h2>Chat</h2>
    
    </Box>
    <label>Select friend</label>
    <FlexBetween
            // backgroundColor={neutralLight}
            borderRadius="4px"
            gap="2rem"
            padding="0.1rem 1.3rem"
          >
            {/* <InputBase placeholder="Search Friends.." />
            <IconButton>
              <Search onChange={handleSearchInputChange}/>
            </IconButton> */}
            
             <FormControl fullWidth variant="outlined">
            <Select
              value={selectedFriend}
              onChange={handleFriendSelection}
              // color={neutralLight}
              label="Select a friend"
            >
              {friends.map((friend) => (
                <MenuItem key={friend.firstName +" "+ friend.lastName} value={friend} sx={{ fontSize: '14px', color: 'black' }}>
                  {friend.firstName+" "+friend.lastName}
         
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </FlexBetween>
        <Box>

        <Box  padding="0.4rem 1.5rem">
          {isSelected && (<FriendChat name={selectedFriend.firstName +" "+ selectedFriend.lastName} userPicturePath={selectedFriend.picturePath} ></FriendChat>)}

        </Box>
     
             <Box
      sx={{
        height: '200px', // Increase the maximum height as needed
        overflowY: 'auto', // Enable vertical scrolling when content exceeds maxHeight
        border: '1px solid #ccc', // Add a border for visual separation
        padding: '10px', // Add padding for spacing
        margin:'10px'
      }}
    >
    
       
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        </Box>
        
        <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          label="Type a message..."
          value={inputText}
          onChange={handleInputChange}
          margin="normal"
        />
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          fullWidth
        >
         
          Send
        </Button> */}
        <button
              onClick={handleSendMessage}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <SendOutlinedIcon color="primary" />
            </button>
            </Box>
  
      
      </Box>
    </Container>
    </WidgetWrapper>
  );
};

export default ChatBox;
