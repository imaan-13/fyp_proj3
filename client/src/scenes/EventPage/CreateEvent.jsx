import FlexBetween from "components/FlexBetween";
import { Box,useTheme,useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import WidgetWrapper from "components/WidgetWrapper";
import Address from "components/Address";
import {
  
  Divider,
  Typography,
  InputBase,
  
  Button,
  IconButton,
  MenuItem,Select
} from "@mui/material";
import { useSelector } from "react-redux";
// import { AddressAutofill ,MapboxSearchBox, SearchBox} from "@mapbox/search-js-react";
// import Map, {
//   GeolocateControl,
//   Marker,
//   NavigationControl,
// } from 'react-map-gl';

import AddMap from "components/Map";

const  CreateEventForm = () => {
  const { palette } = useTheme();
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [locationType, setLocationType] = useState('');
  const [details, setDetails] = useState('');
  const [contact, setContact] = useState(''); // New field
  const[startTime,setStartTime]=useState('');
  const [image, setImage] = useState(null);
  const [url,setUrl]=useState("");
  const { _id } = useSelector((state) => state.user);
  const [community, setCommunity] = useState(''); // New field
  const [postedBy, setPostedBy] = useState(''); // New field
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dropdownOptions = [
    { label: 'Education', value: 'Education' },
    { label: 'Arts & Culture', value: 'Arts & Culture' },
    { label: 'Social', value: 'Social' },
    // ... add more options as needed
  ];
  const [selectedOption, setSelectedOption] = useState('');
  // const search = new MapboxSearchBox();
  // search.accessToken = '<your access token here>';
  // map.addControl(search);




  const handleSubmit = async() => {
    // event.preventDefault();
    // You can perform form submission logic here
    const formData = {
      eventName:eventName,
      startDate:startDate,
      startTime:startTime,
      locationType:locationType,
      details:details,
      contact:contact,
      community:community,
      postedBy:(_id),
      
    };
    // const Data = new FormData();
    //   Data.append("file", image);
    //   Data.append("upload_preset", "event-app");
    //   Data.append("cloud_name", "event-cloud");
    
    //   try {
    //     const response = await fetch(
    //       "https://api.cloudinary.com/v1_1/event-cloud/image/upload",
    //       {
    //         method: "POST",
    //         body: Data,
    //       }
    //     );
    
    //     if (response.ok) {
    //       const cloudinaryData =  await response.json();
    //       if (cloudinaryData.secure_url) {
    //         setUrl(cloudinaryData.secure_url);
    //         formData.photo=cloudinaryData.secure_url;
    //         console.log("Image uploaded and URL set:", cloudinaryData.secure_url);
    //         // window.location.reload();
    //       } else {
    //         console.error("Error uploading image or secure_url is missing.");
    //       }
    //     } else {
    //       console.error("Error uploading image to Cloudinary");
    //     }
    //   } catch (error) {
    //     console.error("An error occurred while uploading image:", error);
    //   }
    // console.log("handle image trig");
    try {
      const response =await fetch("http://localhost:3000/event/api/submit", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Data saved:', responseData);
        // Clear form or perform other actions after successful submission
        setEventName('');
        setStartDate('');
        setLocationType('');
        setDetails('');
        setStartTime('');
        setContact('');
        setImage('');
        setCommunity('');
        setPostedBy('');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    // console.log('Submitting:', {
    //   eventName,
    //   startDate,
    //   locationType,
    //   details,
    // });
 

  return (
    <WidgetWrapper>
    <div>

 

      <h2>Create Event </h2>
      <Box
                display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}>
      <FlexBetween>
      <form onSubmit={handleSubmit}>
        <Box>
         
        <label>
          Event Name:
          <input sx={{ gridColumn: "span 4" }}
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
       
        </Box>
        <br />
        <Box>
        <label>
          Start Date:
          <input
            sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        </Box>
        <Box>
        <label>
          Start Time:
          <input
            sx={{ gridColumn: isNonMobile ? "span 2" : "span 4" }}
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
      </Box>
        <br />
        <Box>
        <label>
          Location Type (In Person or Virtual):
          <select
            sx={{ gridColumn: "span 4" }}
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="inPerson">In Person</option>
            <option value="virtual">Virtual</option>
          </select>
        </label>
        </Box>
        <br />
        <Box>
        <label>
          Event Details:
          <textarea
             sx={{ gridColumn: "span 4" }}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        </Box>
        {/* <br />
        
        <Typography ><label >Picture</label><input type="file" onChange={(e)=>setImage(e.target.files[0])} /></Typography> */}
        <br />
          <Box>
            <label >Contact: 
            <input
              sx={{ gridColumn: 'span 4' }}
              type="number" // Use type="number" for numeric input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
    />




            </label>

          </Box>
          <br />
            <Box>
              
            <Typography>Select community</Typography>
      <Select
        value={community}
        onChange={(e)=>setCommunity(e.target.value)}
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

            </Box>

          <br />
          <Box>
          {/*
          {/* <Map
              {...viewport}
              width="100%"
              height="100%"
              onViewportChange={(newViewport) => setViewport(newViewport)}
              mapboxApiAccessToken="pk.eyJ1IjoiYXdhaXNtaXJ6YSIsImEiOiJjbG0zb3R5ZmQ0YXZnM2V0aHJzaXd4OG43In0.D9cO-iOtCGAj15q9jxDiuA"
              > */}
        {/* Add map components like markers, controls, etc. here */}
        {/* <Marker latitude={37.7577} longitude={-122.4376}>
          <div>Marker Content</div>
        </Marker>
        <NavigationControl />
        <GeolocateControl />
      </Map> */} 
            {/* <SearchBox accessToken="pk.eyJ1IjoiYXdhaXNtaXJ6YSIsImEiOiJjbG0zb3R5ZmQ0YXZnM2V0aHJzaXd4OG43In0.D9cO-iOtCGAj15q9jxDiuA"></SearchBox>
     
               */}

               {/* <AddMap ></AddMap> */}
          </Box>
           

        {/* <Address></Address> */}
      <Button
          type="submit"
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
      </form>
      </FlexBetween>
      </Box>
    </div>

    </WidgetWrapper>
     
  );

 
};

export default CreateEventForm;
