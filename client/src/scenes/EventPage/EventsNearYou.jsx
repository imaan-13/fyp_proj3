import React, { useEffect, useState } from "react";
import {
  Box,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import EventPostsWidget from "scenes/widgets/EventPostsWidget";
import ChatBox from "components/chat";

import EventMap from "components/MapWithEvents";

const EventsNearYou = () => {
  const [selectedRadius, setSelectedRadius] = useState(0); // Set an initial value
  const [filteredEvents, setFilteredEvents] = useState([]);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  
  const handleRadiusChange = async (event) => {
  
    const radius = event.target.value;
    setSelectedRadius(radius);
    console.log("radiuss",selectedRadius);
  await  eventsFilter();
  };

  const eventsFilter=async()=>{
    try {
      const response = await fetch(`http://localhost:3000/event/events-nearby`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: _id,
          selectedRadius: selectedRadius,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFilteredEvents(data.filteredEvents);
      } else {
        console.error('Error fetching events:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }
  // useEffect(() => {
 
  //   eventsFilter();
  // }, []);
  useEffect(() => {
    // Log the updated selectedRadius after it has been set

    console.log("Updated radius:", selectedRadius);


    // Call the eventsFilter function when selectedRadius changes
    eventsFilter();
  }, [selectedRadius]);
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
          <h3>Events Near You</h3>
   
 
          {filteredEvents.length>0 && <EventMap events={filteredEvents} radius={selectedRadius}/>}

       
          {/* Add the dropdown for selecting radius */}
          <FormControl fullWidth>
            <strong>Select Radius (km)</strong>
            <Select
              labelId="radius-label"
              id="radius-select"
              value={selectedRadius}
              onChange={handleRadiusChange}
            >
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
              {/* Add more radius values as needed */}
            </Select>
          </FormControl>

          {selectedRadius  ? (
          <EventPostsWidget filteredEvents={filteredEvents} />
        ) : (
          <p>No events found for the selected radius.</p>
        )}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <ChatBox />
            <Box m="2rem 0" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EventsNearYou;
