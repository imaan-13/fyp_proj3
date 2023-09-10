// import { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   useMediaQuery,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import { Formik } from "formik";

// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogin } from "state";
// import Dropzone from "react-dropzone";
// import FlexBetween from "components/FlexBetween";

// const registerSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   password: yup.string().required("required"),
//   location: yup.string().required("required"),
//   occupation: yup.string().required("required"),
//   picture: yup.string().required("required"),
// });

// const loginSchema = yup.object().shape({
//   email: yup.string().email("invalid email").required("required"),
//   password: yup.string().required("required"),
// });

// const initialValuesRegister = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   location: "",
//   occupation: "",
//   picture: "",
// };

// const initialValuesLogin = {
//   email: "",
//   password: "",
// };

// const Form = () => {
//   const [pageType, setPageType] = useState("login");
//   const { palette } = useTheme();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isNonMobile = useMediaQuery("(min-width:600px)");
//   const isLogin = pageType === "login";
//   const isRegister = pageType === "register";

//   const register = async (values, onSubmitProps) => {
//     // this allows us to send form info with image
//     const formData = new FormData();
//     for (let value in values) {
//       formData.append(value, values[value]);
//     }
//     formData.append("picturePath", values.picture.name);

//     const savedUserResponse = await fetch(
//       "http://localhost:3000/auth/register",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );
//     const savedUser = await savedUserResponse.json();
//     onSubmitProps.resetForm();

//     if (savedUser) {
//       setPageType("login");
//     }
//   };

//   const login = async (values, onSubmitProps) => {
//     const loggedInResponse = await fetch("http://localhost:3000/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(values),
//     });
//     const loggedIn = await loggedInResponse.json();
//     onSubmitProps.resetForm();
//     if (loggedIn) {
//       dispatch(
//         setLogin({
//           user: loggedIn.user,
//           token: loggedIn.token,
//         })
//       );
//       navigate("/home");
//     }
//   };

//   const handleFormSubmit = async (values, onSubmitProps) => {
//     if (isLogin) await login(values, onSubmitProps);
//     if (isRegister) await register(values, onSubmitProps);
//   };

//   return (
//     <Formik
//       onSubmit={handleFormSubmit}
//       initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
//       validationSchema={isLogin ? loginSchema : registerSchema}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleBlur,
//         handleChange,
//         handleSubmit,
//         setFieldValue,
//         resetForm,
//       }) => (
//         <form onSubmit={handleSubmit}>
//           <Box
//             display="grid"
//             gap="30px"
//             gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//             sx={{
//               "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//             }}
//           >
//             {isRegister && (
//               <>
//                 <TextField
//                   label="First Name"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.firstName}
//                   name="firstName"
//                   error={
//                     Boolean(touched.firstName) && Boolean(errors.firstName)
//                   }
//                   helperText={touched.firstName && errors.firstName}
//                   sx={{ gridColumn: "span 2" }}
//                 />
//                 <TextField
//                   label="Last Name"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.lastName}
//                   name="lastName"
//                   error={Boolean(touched.lastName) && Boolean(errors.lastName)}
//                   helperText={touched.lastName && errors.lastName}
//                   sx={{ gridColumn: "span 2" }}
//                 />
//                 <TextField
//                   label="Location"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.location}
//                   name="location"
//                   error={Boolean(touched.location) && Boolean(errors.location)}
//                   helperText={touched.location && errors.location}
//                   sx={{ gridColumn: "span 4" }}
//                 />
//                 <TextField
//                   label="Occupation"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.occupation}
//                   name="occupation"
//                   error={
//                     Boolean(touched.occupation) && Boolean(errors.occupation)
//                   }
//                   helperText={touched.occupation && errors.occupation}
//                   sx={{ gridColumn: "span 4" }}
//                 />
//                 <Box
//                   gridColumn="span 4"
//                   border={`1px solid ${palette.neutral.medium}`}
//                   borderRadius="5px"
//                   p="1rem"
//                 >
//                   <Dropzone
//                     acceptedFiles=".jpg,.jpeg,.png"
//                     multiple={false}
//                     onDrop={(acceptedFiles) =>
//                       setFieldValue("picture", acceptedFiles[0])
//                     }
//                   >
//                     {({ getRootProps, getInputProps }) => (
//                       <Box
//                         {...getRootProps()}
//                         border={`2px dashed ${palette.primary.main}`}
//                         p="1rem"
//                         sx={{ "&:hover": { cursor: "pointer" } }}
//                       >
//                         <input {...getInputProps()} />
//                         {!values.picture ? (
//                           <p>Add Picture Here</p>
//                         ) : (
//                           <FlexBetween>
//                             <Typography>{values.picture.name}</Typography>
//                             <EditOutlinedIcon />
//                           </FlexBetween>
//                         )}
//                       </Box>
//                     )}
//                   </Dropzone>
//                 </Box>
//               </>
//             )}

//             <TextField
//               label="Email"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               value={values.email}
//               name="email"
//               error={Boolean(touched.email) && Boolean(errors.email)}
//               helperText={touched.email && errors.email}
//               sx={{ gridColumn: "span 4" }}
//             />
//             <TextField
//               label="Password"
//               type="password"
//               onBlur={handleBlur}
//               onChange={handleChange}
//               value={values.password}
//               name="password"
//               error={Boolean(touched.password) && Boolean(errors.password)}
//               helperText={touched.password && errors.password}
//               sx={{ gridColumn: "span 4" }}
//             />
//           </Box>

//           {/* BUTTONS */}
//           <Box>
//             <Button
//               fullWidth
//               type="submit"
//               sx={{
//                 m: "2rem 0",
//                 p: "1rem",
//                 backgroundColor: palette.primary.main,
//                 color: palette.background.alt,
//                 "&:hover": { color: palette.primary.main },
//               }}
//             >
//               {isLogin ? "LOGIN" : "REGISTER"}
//             </Button>
//             <Typography
//               onClick={() => {
//                 setPageType(isLogin ? "register" : "login");
//                 resetForm();
//               }}
//               sx={{
//                 textDecoration: "underline",
//                 color: palette.primary.main,
//                 "&:hover": {
//                   cursor: "pointer",
//                   color: palette.primary.light,
//                 },
//               }}
//             >
//               {isLogin
//                 ? "Don't have an account? Sign Up here."
//                 : "Already have an account? Login here."}
//             </Typography>
//           </Box>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default Form;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import state from 'state';
// import {
//   Box,
//   Button,
//   TextField,
//   useMediaQuery,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import { setLogin } from 'state';
// import { useDispatch } from "react-redux";
// // import { Typography,useTheme } from '@mui/material';
// import FlexBetween from 'components/FlexBetween';

// const Form = () => {
// const [firstName, setFirstName] = useState('');
// const [lastName, setLastName] = useState('');
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [location, setLocation] = useState('');
// const [occupation, setOccupation] = useState('');
// const [picture, setPicture] = useState(null); // Initialize 'picture' as null
//  const isNonMobile = useMediaQuery("(min-width:600px)");
// const [url,setUrl]=useState("");
//   const { palette } = useTheme();
//   const [pageType, setPageType] = useState('login');
//   const navigate=useNavigate();
//   const dispatch=useDispatch();
//   const isLogin = pageType === 'login';
//   const isRegister = pageType === 'register';

 

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
  
//     if (isLogin) {
    
  
//       try {
//         // Make an API request to your login endpoint
//         const response = await fetch('http://localhost:3000/auth/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//         });
  
//         if (response.ok) {
//           // Successful login
//           const loggedIn = await response.json();
  
//           // Handle success, e.g., store user data in state or local storage
//           console.log('Logged in:', loggedIn);
          
//           // Redirect to the home page or some other route
//           if (loggedIn) {
//                   dispatch(
//                     setLogin({
//                       user: loggedIn.user,
//                       token: loggedIn.token,
//                     })
//                   );}
//           navigate('/home');
//         } else {
//           // Handle login failure, e.g., display an error message
//           console.error('Login failed');
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//       }
//     } else if (isRegister) {
//       // Handle registration
//       // const { firstName, lastName, email, password, location, occupation, picture } = formData;
  
//       try {
//         // Create a FormData object for file uploads
//         // const formData = new FormData();
//         // formData.append('firstName', firstName);
//         // formData.append('lastName', lastName);
//         // formData.append('email', email);
//         // formData.append('password', password);
//         // formData.append('location', location);
//         // formData.append('occupation', occupation);
//         // formData.append('picturePath', picture);
  
//         const formData={
//           firstName:firstName,
//           lastName:lastName,
//           email:email,
//           password:password,
//           location:location,
//           occupation:occupation,
//         }

//         const Data = new FormData();
//         Data.append("file", picture);
//         Data.append("upload_preset", "event-app");
//         Data.append("cloud_name", "event-cloud");
      
//         try {
//           const response1 = await fetch(
//             "https://api.cloudinary.com/v1_1/event-cloud/image/upload",
//             {
//               method: "POST",
//               body: Data,
//             }
//           );
      
//           if (response1.ok) {
//             const cloudinaryData =  await response1.json();
//             if (cloudinaryData.secure_url) {
//               setUrl(cloudinaryData.secure_url);
//               formData.picturePath=cloudinaryData.secure_url;
//               console.log("Image uploaded and URL set:", cloudinaryData.secure_url);
             
//             } else {
//               console.error("Error uploading image or secure_url is missing.");
//             }
//           } else {
//             console.error("Error uploading image to Cloudinary");
//           }
//         } catch (error) {
//           console.error("An error occurred while uploading image:", error);
//         }
//         console.log("handle image trig");
//         // // Make an API request to your registration endpoint
//         const response = await fetch('http://localhost:3000/auth/register', {
//           method: 'POST',
//           body: JSON.stringify(formData),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
  
//         if (response.ok) {
//           // Successful registration
//           const savedUser = await response.json();
  
//           // Handle success, e.g., display a success message
//           console.log('Registered:', savedUser);
  
//           // Switch to the login page
//           setPageType('login');
//           // Clear the form fields
//           // setFormData({
//           //   firstName: '',
//           //   lastName: '',
//           //   email: '',
//           //   password: '',
//           //   location: '',
//           //   occupation: '',
//           //   picture: null,
//           // });
//           setFirstName('');
//           setLastName('');
//           setEmail('');
//           setPassword('');
//           setLocation('');
//           setOccupation('');
//           setPicture(null); // To clear the picture

//         } else {
//           // Handle registration failure, e.g., display an error message
//           console.error('Registration failed');
//         }
//       } catch (error) {
//         console.error('Error during registration:', error);
//       }
//     }
//   };
  

//   return (
//     <form onSubmit={handleFormSubmit}>
//        <Box
//             display="grid"
//             gap="30px"
//             gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//             sx={{
//               "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//             }}
//           >
//       {isRegister && (
//         <>
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e)=>setFirstName(e.target.value)}
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e)=>setLastName(e.target.value)}
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={location}
//             onChange={(e)=>setLocation(e.target.value)}
//           />
//           <input
//             type="text"
//             name="occupation"
//             placeholder="Occupation"
//             value={occupation}
//             onChange={(e)=>setOccupation(e.target.value)}
//           />

//             <Box
//               //  border={`2px dashed ${palette.primary.main}`}
//                 p="1rem"
//               sx={{ "&:hover": { cursor: "pointer" } }}
//             >
//           <input
//             type="file"
//             name="picture"
//             accept=".jpg, .jpeg, .png"
//             onChange={(e)=>setPicture(e.target.files[0])}
//           />
//           </Box>
//         </>
//       )}
//       <FlexBetween>
//        <Typography sx={{
//                 textDecoration: "underline",
//                 color: palette.primary.main,
//                 "&:hover": {
//                   cursor: "pointer",
//                   color: palette.primary.light,
//                 }}}>
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e)=>setEmail(e.target.value)}
//       />
//       </Typography>
//       <Typography sx={{
//                 textDecoration: "underline",
//                 color: palette.primary.main,
//                 "&:hover": {
//                   cursor: "pointer",
//                   color: palette.primary.light,
//                 }}}>
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e)=>setPassword(e.target.value)}
//       />
//       </Typography >

//       {/* <Typography sx={{
//                 textDecoration: "underline",
//                 color: palette.primary.main,
//                 "&:hover": {
//                   cursor: "pointer",
//                   color: palette.primary.light,
//                 }}}> */}
//       <button type="submit">{isLogin ? 'LOGIN' : 'REGISTER'}</button>
      
//       {/* </Typography> */}
//       <br />
//       <Box>
//       <p
//         onClick={() => {
//           setPageType(isLogin ? 'register' : 'login');
//           // Clear form data when switching between login and register
//           setFirstName('');
//           setLastName('');
//           setEmail('');
//           setPassword('');
//           setLocation('');
//           setOccupation('');
//           setPicture(null); // To clear the picture
          
//         }}
//       >
      
//         {isLogin
//           ? "Don't have an account? Sign Up here."
//           : 'Already have an account? Login here.'}
//       </p>
//       </Box>
//       </FlexBetween>
//        </Box>
//     </form>
//   );
// };

// export default Form;




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
