


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import state from 'state';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { setLogin } from 'state';
import { useDispatch } from "react-redux";
import FlexBetween from 'components/FlexBetween';

const Form = () => {
  // ... (your existing state declarations)
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [location, setLocation] = useState('');
const [occupation, setOccupation] = useState('');
const [picture, setPicture] = useState(null); // Initialize 'picture' as null
 const isNonMobile = useMediaQuery("(min-width:600px)");
const [url,setUrl]=useState("");
  const { palette } = useTheme();
  const [pageType, setPageType] = useState('login');
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';
const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (isLogin) {
    
  
      try {
        // Make an API request to your login endpoint
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          // Successful login
          const loggedIn = await response.json();
  
          // Handle success, e.g., store user data in state or local storage
          console.log('Logged in:', loggedIn);
          
          // Redirect to the home page or some other route
          if (loggedIn) {
                  dispatch(
                    setLogin({
                      user: loggedIn.user,
                      token: loggedIn.token,
                    })
                  );}
          navigate('/home');
        } else {
          // Handle login failure, e.g., display an error message
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else if (isRegister) {
      // Handle registration
      // const { firstName, lastName, email, password, location, occupation, picture } = formData;
  
      try {
        // Create a FormData object for file uploads
        // const formData = new FormData();
        // formData.append('firstName', firstName);
        // formData.append('lastName', lastName);
        // formData.append('email', email);
        // formData.append('password', password);
        // formData.append('location', location);
        // formData.append('occupation', occupation);
        // formData.append('picturePath', picture);
  
        const formData={
          firstName:firstName,
          lastName:lastName,
          email:email,
          password:password,
          location:location,
          occupation:occupation,
        }

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
              formData.picturePath=cloudinaryData.secure_url;
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
        // // Make an API request to your registration endpoint
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          // Successful registration
          const savedUser = await response.json();
  
          // Handle success, e.g., display a success message
          console.log('Registered:', savedUser);
  
          // Switch to the login page
          setPageType('login');
          // Clear the form fields
          // setFormData({
          //   firstName: '',
          //   lastName: '',
          //   email: '',
          //   password: '',
          //   location: '',
          //   occupation: '',
          //   picture: null,
          // });
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setLocation('');
          setOccupation('');
          setPicture(null); // To clear the picture

        } else {
          // Handle registration failure, e.g., display an error message
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  };
  
  return (
    <form onSubmit={handleFormSubmit}>
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(1, 1fr)" // Changed to one column layout
      >
        {isRegister && (
          <>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="occupation">Occupation:</label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                placeholder="Occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="picture">Profile Picture:</label>
              <Box
                p="1rem"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
              </Box>
            </div>
          </>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit"  sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}>{isLogin ? 'LOGIN' : 'REGISTER'}</Button>
        </div>
        <div>
          <p
            onClick={() => {
              setPageType(isLogin ? 'register' : 'login');
              // Clear form data when switching between login and register
              setFirstName('');
              setLastName('');
              setEmail('');
              setPassword('');
              setLocation('');
              setOccupation('');
              setPicture(null);
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : 'Already have an account? Login here.'}
          </p>
        </div>
      </Box>
    </form>
  );
};

export default Form;
