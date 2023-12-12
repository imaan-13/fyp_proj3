import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,

  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme,Button } from "@mui/material";
  import UserImage from "components/UserImage";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Link } from 'react-router-dom';
  // import {PersonAddIcon} from '@mui/icons-material/PersonAdd';
  // import {PersonRemoveIcon} from '@mui/icons-material/PersonRemove';
  import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
 
  
  const UserWidget = ({ userId, picturePath,loggedInUser }) => {
    const [user, setUser] = useState(null);
    const [addedAsFriend, setaddedAsFriend]=useState(null);
    const [pic,setpic]=useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
  
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;

    const getUser = async () => {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
      setpic(data.picturePath)
      console.log(data.friends.includes(loggedInUser))
      setaddedAsFriend(data.friends.includes(loggedInUser))
    };

    const addUserAsFriend = async () => {
      const requestData = {
        id: loggedInUser,
        friendId:userId
      };
    
      try {
        const response = await fetch(`http://localhost:3000/users/addRemoveFriend`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        });
    
        if (response.status === 200) {
          // Friend added successfully
          console.log("Friend added successfully.");
          window.location.reload()
        } else {
          // Handle any errors here
          console.error("Error adding friend.");
        }
      } catch (error) {
        console.error("Error adding friend:", error);
      }
    };
    

  
    useEffect(() => {
      getUser();

      
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    if (!user) {
      return null;
    }
  
    const {
      firstName,
      lastName,
      location,
      occupation,
      viewedProfile,
      impressions,
      friends,
    } = user;
  
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          {/* <ManageAccountsOutlined /> */}
          {/* {(userId!==loggedInUser) && (!addedAsFriend) &&
          
          
          <PersonAddOutlined onClick={addUserAsFriend} sx={{ color: primaryDark }} />} */}
          {
          (userId !== loggedInUser && !addedAsFriend) ? (
            <PersonAddOutlined onClick={addUserAsFriend} sx={{ color: primaryDark }} />
           ) : (userId !== loggedInUser) ? <PersonRemoveOutlined onClick={addUserAsFriend} sx={{ color: primaryDark }}/>: null
          }

          
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>
  
        <Divider />
  
        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={main} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={main} fontWeight="500">
              {impressions}
            </Typography>
          </FlexBetween>
        </Box>
  
        <Divider />
  
        {/* FOURTH ROW */}
        {(userId===loggedInUser)&&(
        <Box p="1rem 0">
        
  
          <FlexBetween gap="1rem" mb="0.5rem">
              <Link to="/event-page">
            <Button
          
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
            // onclick={ ()=>navigate("/homePage/EventForm")}
          >
            CREATE EVENT 
          </Button>
          </Link>

          <Link to="/edit-profile">
            <Button
          
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
            // onclick={ ()=>navigate("/homePage/EventForm")}
          >
            EDIT PROFILE 
          </Button>
          </Link>
          </FlexBetween>
  
       
        </Box>)
        }
      </WidgetWrapper>
    );
  };
  
  export default UserWidget;
  