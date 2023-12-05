import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import { useSelector } from 'react-redux';
import WidgetWrapper from 'components/WidgetWrapper';
import Popup from 'components/popUp';

const EditProfileForm = () => {
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     location: '',
//     occupation: '',
//     picture: null,
//   });
const token = useSelector((state) => state.token);
const { _id } = useSelector((state) => state.user);
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [location, setLocation] = useState('');
const [occupation, setOccupation] = useState('');
const [picture, setPicture] = useState(null);
const [isPictureChanged, setIsPictureChanged] = useState(false);
const[popUpVal,setpopUpVal]=useState(false);
  const [url, setUrl] = useState('');
  const { palette } = useTheme();
//   const [pageType, setPageType] = useState('register'); // Start with registration
  const navigate = useNavigate();
//   const isRegister = pageType === 'register';

  useEffect(() => {
    // Simulate fetching user profile data from a database
    // Replace this with actual API call to fetch user data
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${_id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
        if (response.ok) {
          const userProfileData = await response.json();
          setFirstName(userProfileData.firstName)
          setLastName(userProfileData.lastName);
          setEmail(userProfileData.email);
          setPassword(userProfileData.password);
          setLocation(userProfileData.location);
          setOccupation(userProfileData.occupation);
          setPicture(userProfileData.picturePath);
        } else {
          console.error('Failed to fetch user profile data');
        }
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };

    fetchUserProfile();
  }, []);


  const handlePopupClose = () => {
    // Reload the page when the popup is closed
    window.location.reload();
  };
  

  const handleFormSubmit = async (e) => {

    e.preventDefault();
    const profileData={
        firstName:firstName,
        lastName:lastName,
        email:email,
        // password:password,
        location:location,
        occupation:occupation,
        picturePath:picture,
        _id:_id
    }

    
 if(isPictureChanged){
    
    const Data = new FormData();
    Data.append("file", picture);
    Data.append("upload_preset", "event-app");
    Data.append("cloud_name", "event-cloud");
  
    try {
      const response1 = await fetch(
        "https://api.cloudinary.com/v1_1/event-cloud/image/upload",
        {
          method: "POST",
          body: Data,
        }
      );
  
      if (response1.ok) {
        const cloudinaryData =  await response1.json();
        if (cloudinaryData.secure_url) {
          setUrl(cloudinaryData.secure_url);
          profileData.picturePath=cloudinaryData.secure_url;
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
 }




    // Handle profile update
    try {
      // Simulate sending updated profile data to the server
      // Replace this with an actual API call to update user profile
      const response = await fetch(`http://localhost:3000/users/updateProfile`, {
        method: "PATCH",
        body: JSON.stringify(profileData),
        headers: { "Content-Type": "application/json"},
      });

      if (response.ok) {
        // Successful profile update
        const updatedProfileData = await response.json();
        // setProfileData(updatedProfileData);
        // Redirect to a success page or handle it as needed
        // navigate('/profile-updated');
        setpopUpVal(true);
        // window.location.reload();

      } else {
        // Handle profile update failure, e.g., display an error message
        console.error('Profile update failed');
      }
    } catch (error) {
      console.error('Error during profile update:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <WidgetWrapper>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(1, 1fr)" // Changed to one column layout
      >
        
          <>
            <div>
              <label htmlFor="firstName"><strong>First Name:</strong></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName( e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName"><strong>Last Name:</strong></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName( e.target.value )}
              />
            </div>
            <div>
              <label htmlFor="location"><strong>Location:</strong></label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation( e.target.value )}
              />
            </div>
            <div>
              <label htmlFor="occupation"><strong>Occupation:</strong></label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                placeholder="Occupation"
                value={occupation}
                onChange={(e) => setOccupation( e.target.value )}
              />
            </div>
            <div>
              <label htmlFor="picture"><strong>Profile Picture:</strong></label>
              <Box
                p="1rem"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    setPicture(e.target.files[0]);
                    setIsPictureChanged(true);
                  }}
                />
              </Box>
            </div>
          </>
    
        <div>
          <label htmlFor="email"><strong>Email:</strong></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail( e.target.value )}
          />
        </div>
        {/* <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword( e.target.value )}
          />
        </div> */}
        <div>
          <Button type="submit" sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}>UPDATE PROFILE</Button>
        </div>
        {popUpVal&& <Popup open={true} message={"Profile Updated Successfully!"} handleClose={handlePopupClose}/> }
      </Box>
      </WidgetWrapper>
    </form>
  );
};

export default EditProfileForm;
