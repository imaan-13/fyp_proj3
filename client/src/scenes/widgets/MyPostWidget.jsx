

import {
      Box,
      Divider,
      Typography,
      InputBase,
      useTheme,
      Button,
      IconButton,
      useMediaQuery,MenuItem,Select
    } from "@mui/material";
  import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
    Height,
  } from "@mui/icons-material";
  import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserImage from "components/UserImage";
import { upload } from "@testing-library/user-event/dist/upload";
import Popup from "components/popUp";


const MyPostWidget = ({picturePath}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url,setUrl]=useState("");
  const [popUpVal,setpopUpVal]=useState(false)
  let imageUrl="";
  // const { _id } = useSelector((state) => state.user);
  const { palette } = useTheme();
      const { _id } = useSelector((state) => state.user);
      const token = useSelector((state) => state.token);
      const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
      const mediumMain = palette.neutral.mediumMain;
      const medium = palette.neutral.medium;


      const dropdownOptions = [
        { label: 'Education', value: 'Education' },
        { label: 'Arts & Culture', value: 'Arts & Culture' },
        { label: 'Social', value: 'Social' },
        // ... add more options as needed
      ];
      const [selectedOption, setSelectedOption] = useState('');
      

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleImageChange =  (event) => {
    setImage(event.target.files[0]);
    

      
  };

    const handleCommunityChange= (event)=>{
  setSelectedOption(event.target.value);
  };

  const handlePopupClose = () => {
    // Reload the page when the popup is closed
    window.location.reload();
  };
  



  const handlePostSubmit = async (event) => {
 
    console.log(_id);
    
    const dataToSend = {
      title: title, // Make sure 'title' contains the actual value
      body: body,
      postedBy:(_id), // Make sure '_id' contains the actual value
      community:selectedOption,
      
    };
    const Data = new FormData();
      Data.append("file", image);
      Data.append("upload_preset", "event-app");
      Data.append("cloud_name", "event-cloud");
    
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/event-cloud/image/upload",
          {
            method: "POST",
            body: Data,
          }
        );
    
        if (response.ok) {
          const cloudinaryData =  await response.json();
          if (cloudinaryData.secure_url) {
            setUrl(cloudinaryData.secure_url);
            dataToSend.photo=cloudinaryData.secure_url;
            console.log("Image uploaded and URL set:", cloudinaryData.secure_url);
           
          } else {
            console.error("Error uploading image or secure_url is missing.");
          }
        } else {
          console.error("Error uploading image to Cloudinary");
        }
      } catch (error) {
        console.error("An error occurred while uploading image:", error);
      }
    console.log("handle image trig");
    try {

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your actual token
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend) ,
     
      });

      if (response.ok) {
        console.log("Post successfully created!");
        setpopUpVal(true);
        // window.location.reload();
        // Optionally, you can reset the form fields here
        setTitle("");
        setBody("");
        setImage("");
        setUrl("");
        setSelectedOption("");
       
      } else {
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
 
   
  };

  return (
    <WidgetWrapper>
      <FlexBetween>
    <div>
    <h2>Create a New Post</h2>

      <FlexBetween gap="1.5rem">
        
      <UserImage image={picturePath} />
      {/* <label>Title</label> */}

{/*       
      <input
        
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      /> */}

        <InputBase
            placeholder="What's on your mind..."
            onChange={handleBodyChange}
            value={body}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
      </FlexBetween>

      {/* <textarea

        placeholder="Body"
        value={body}
        onChange={handleBodyChange}
      /> */}


      
      
      <FlexBetween >
     
      
      <Typography color={mediumMain}><input type="file" onChange={handleImageChange} /></Typography>
      
      <br></br>
      <Typography>Select community</Typography>
      <Select
        value={selectedOption}
        onChange={handleCommunityChange}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        
          getContentAnchorEl: null, // Adjusts the positioning of the menu
        }}
        sx={{
          width: '100%',
          backgroundColor: palette.neutral.light,
          borderRadius: '0.5rem',
          padding: '0rem 1.5rem',
          margin:'0.5rem'
        }}
      >
        <MenuItem value="">Select an option</MenuItem>
        {dropdownOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      </FlexBetween>
     
{/*       
      <button onClick={handlePostSubmit}>Post</button> */}

      <Button
            disabled={!body}
            onClick={handlePostSubmit}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
          {popUpVal&& <Popup open={true} message={"Added Post Successfully!"} handleClose={handlePopupClose}/> }


    </div>
    </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
