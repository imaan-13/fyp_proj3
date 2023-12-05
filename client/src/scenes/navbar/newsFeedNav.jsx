// import { useEffect, useState } from "react";
// import {
//   Box,
//   IconButton,
//   InputBase,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   Search,
//   Message,
//   DarkMode,
//   LightMode,
//   Notifications,
//   Help,
//   Menu,
//   Close,
//   ArrowDropDown, // Import ArrowDropDown icon
// } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { setMode, setLogout } from "state";
// import { useNavigate } from "react-router-dom";
// import FlexBetween from "components/FlexBetween";
// import { Link } from 'react-router-dom';
// import { lightBlue } from "@mui/material/colors";
// import Homepage from "scenes/homePage";
// const Navbar2 = ({isMain, isCommunity, community}) => {
//   const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
//   const [isMainPage, setIsMainPage]=useState("")
//   const theme = useTheme();
//   const neutralLight = theme.palette.neutralLight;
//   const dark = theme.palette.neutral.dark;
//   const background = theme.palette.background.default;
//   const primaryLight = theme.palette.primary.light;
//   const alt = theme.palette.background.alt;





//   return (

    
//     <FlexBetween padding="1rem 6%" backgroundColor={lightBlue}>
//       <FlexBetween gap="1.75rem">
//         {/* Button for "All Posts" */}
    
//             <Link to="/all-posts" style={{ textDecoration: "none" }}>
//           <button
          
//             style={{
//               backgroundColor: "transparent",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             All Posts <ArrowDropDown /> {/* Add Arrow Icon */}
//           </button>
//         </Link>
    
//         {/* Button for "User Posts" */}
//         <Link to={"/event-posts"} style={{ textDecoration: "none" }}>
//           <button
//             style={{
//               backgroundColor: "transparent",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             Events Posts <ArrowDropDown /> {/* Add Arrow Icon */}
//           </button>
//         </Link>
      
    
//       </FlexBetween>

//       {/* Rest of your code... */}
//     </FlexBetween>
//   );
// };

// export default Navbar2;


// import { useNavigate } from 'react-router-dom';

// // ...

// const Navbar2 = ({ isMain, isCommunity, community }) => {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
//   const [isMainPage, setIsMainPage] = useState('');
//   const theme = useTheme();
//   const neutralLight = theme.palette.neutralLight;
//   const dark = theme.palette.neutral.dark;
//   const background = theme.palette.background.default;
//   const primaryLight = theme.palette.primary.light;
//   const alt = theme.palette.background.alt;

//   const value=isMain;


//   const handleAllPostsClick = () => {
//     if (value) {
//       navigate('/all-posts');
//     } else if (isCommunity&&community==="Education") {
//       navigate("/education-community")
//     } else {
//       // Handle other cases
      
//     }
//   };

//   const handleEventPostsClick = () => {
//     if (value) {
//       navigate('/event-posts');
//     } else if (isCommunity) {
//       navigate("/education-community-events")
//     } else {
//       // Handle other cases
      
//     }
//   };
//   return (
//     <FlexBetween padding="1rem 6%" backgroundColor={lightBlue}>
//       <FlexBetween gap="1.75rem">
//         {/* Button for "All Posts" */}
//         <button
//           onClick={handleAllPostsClick}
//           style={{
//             backgroundColor: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           All Posts <ArrowDropDown /> {/* Add Arrow Icon */}
//         </button>

//         {/* Button for "Event Posts" */}
//         <button
//           onClick={()=>{handleEventPostsClick()}}
//           style={{
//             backgroundColor: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           Events Posts <ArrowDropDown /> {/* Add Arrow Icon */}
//         </button>
//       </FlexBetween>

//       {/* Rest of your code... */}
//     </FlexBetween>
//   );
// };

// export default Navbar2;
