import React from "react";
import { Link } from 'react-router-dom';
import { ArrowDropDown } from "@mui/icons-material";
// import { FlexBetween } from "components/FlexBetween";
import { lightBlue } from "@mui/material/colors";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useTheme } from "@emotion/react";
const NavbarWithProps = ({ isMain, isComm, Comm }) => {


  const { palette } = useTheme();

  const calculateContrastColor = (backgroundColor) => {
    // Calculate the contrast between background color and black/white
    const hexToRgb = (hex) => hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));
    const rgb = hexToRgb(backgroundColor);
    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  
    // Use white or black based on luminance
    return luminance > 0.5 ? "black" : "white";
  };


  const backgroundAltColor = palette.background.alt;
  const oppositeColor = calculateContrastColor(backgroundAltColor);

  const handleAllPostsClick = () => {
    if (isMain) {
      // Navigate to the "/all-posts" route for the main view
      // Modify this route as needed
      window.location.href = "/all-posts";
    } else if(isComm) {
      
        if(Comm==="Education"){
            window.location.href = "/education-community";
        }
        else if(Comm==="Social"){
            window.location.href = "/social-community";
        }
        else if(Comm==="Arts & Culture"){
            window.location.href = "/arts&culture-community"
        }
    }
  };

  const handleEventPostsClick = () => {
    if (isMain) {
      // Navigate to the "/event-posts" route for the main view
      // Modify this route as needed
      window.location.href = "/event-posts";
    } else if(isComm) {
      
        if(Comm==="Education"){
            window.location.href = "/education-community-events";
        }
        else if(Comm==="Social"){
            window.location.href = "/social-community-events"
        }
        else{
            window.location.href ="/arts&culture-community-events"
        }
    }
  };

  return (
    <WidgetWrapper>
    <FlexBetween padding="1rem 6%" backgroundColor={lightBlue}>
      <FlexBetween gap="1.75rem">
        {/* Button for "All Posts" */}
        <button
          onClick={handleAllPostsClick}
          style={{
            backgroundColor: 'transparent',
            color:oppositeColor,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1rem', // Adjust the font size as needed

          }}
        >
          All Posts <ArrowDropDown /> {/* Add Arrow Icon */}
        </button>

        {/* Button for "Event Posts" */}
        <button
          onClick={handleEventPostsClick}
          style={{
            backgroundColor: 'transparent',
            color:oppositeColor,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1rem', // Adjust the font size as needed

          }}
        >
          Events Posts <ArrowDropDown /> {/* Add Arrow Icon */}
        </button>
      </FlexBetween>

      {/* Rest of your code... */}
    </FlexBetween>
    </WidgetWrapper>
  );
};

export default NavbarWithProps;
